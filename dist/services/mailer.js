"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.imapFlowConnect = void 0;
const fs = require("fs");
const mailparser = require("mailparser");
const MailParser = mailparser.MailParser;
var ECommand;
(function (ECommand) {
    ECommand[ECommand["update"] = 0] = "update";
    ECommand[ECommand["noCommand"] = 1] = "noCommand";
})(ECommand || (ECommand = {}));
const Imap = require('imap'), inspect = require('util').inspect;
const imapflow_1 = require("imapflow");
const settings_1 = require("../models/settings");
const whiteEmailList_1 = require("../models/whiteEmailList");
const excel_1 = require("./excel");
const imapFlowConnect = () => __awaiter(void 0, void 0, void 0, function* () {
    // Select and lock a mailbox. Throws if mailbox does not exist
    let lock;
    let client;
    try {
        const client = new imapflow_1.ImapFlow({
            host: 'imap.yandex.ru',
            port: 993,
            secure: true,
            auth: {
                user: 'priz.a@yandex.ru',
                pass: '89045462751'
            },
            disableAutoIdle: true,
            logger: false,
            logRaw: false,
            emitLogs: false,
            greetingTimeout: 30000
        });
        yield client.connect();
        lock = yield client.getMailboxLock('INBOX');
        console.log(client.mailbox);
        const obj = client.mailbox;
        console.log(obj.exists);
        const lastMessage = yield settings_1.default.findOne({
            where: {
                [settings_1.SettingsRow.name]: 'lastMail'
            }
        });
        console.log(lastMessage.value);
        const pullUuid = [];
        if (obj.exists > lastMessage.value) {
            for (let messageCounter = lastMessage.value + 1; messageCounter <= obj.exists; messageCounter++) {
                console.log(messageCounter.toString());
                let mailParams = yield client.fetchOne(messageCounter.toString(), { uid: true, envelope: true, bodyStructure: true });
                console.log("mailParams");
                console.log(mailParams);
                if (typeof (mailParams) == "boolean") {
                    continue;
                }
                const address = mailParams.envelope.from[0].address;
                console.log(address);
                if (!address) {
                    continue;
                }
                const find = yield whiteEmailList_1.default.findOne({
                    where: {
                        [whiteEmailList_1.WhiteEmailListRow.email]: address
                    }
                });
                if (!find) {
                    continue;
                }
                console.log("FIND");
                let textCommand = false;
                let textCommandType = ECommand.noCommand;
                let fileCommand = false;
                let fileName = "";
                let encoding = "";
                let bodyParts = [];
                const childNodes = mailParams.bodyStructure.childNodes;
                childNodes.forEach((element) => {
                    if (element.part == '1') {
                        console.log(element.childNodes);
                        element.childNodes.forEach((nodes) => {
                            if (nodes.type == "text/plain") {
                                textCommand = true;
                                bodyParts.push(nodes.part);
                            }
                        });
                    }
                    if (element.part == "2") {
                        if (element.disposition == 'attachment') {
                            fileCommand = true;
                            fileName = element.dispositionParameters['filename'];
                            encoding = element.encoding;
                            bodyParts.push("2");
                        }
                    }
                });
                console.log(bodyParts);
                let messageFullContent = yield client.fetchOne(messageCounter.toString(), { source: true, uid: true, bodyStructure: true, headers: false, bodyParts: bodyParts, envelope: true });
                const textInMessage = messageFullContent.bodyParts.get(bodyParts[0]).toString();
                if (textInMessage.includes("update")) {
                    textCommandType = ECommand.update;
                }
                if (textCommandType == ECommand.noCommand) {
                    continue;
                }
                if (textCommandType == ECommand.update && fileCommand && textCommand) {
                    const buffer = Buffer.from(messageFullContent.bodyParts.get(bodyParts[1]).toString('utf8'), 'base64');
                    console.log(__dirname);
                    fs.writeFileSync(__dirname + "/../temp/" + fileName, buffer);
                    yield excel_1.default.syncToDB(fileName);
                }
                else {
                    continue;
                }
            }
            yield settings_1.default.update({
                [settings_1.SettingsRow.value]: obj.exists
            }, {
                where: {
                    [settings_1.SettingsRow.name]: 'lastMail'
                }
            });
        }
    }
    catch (e) {
        console.error(e);
    }
    finally {
        // Make sure lock is released, otherwise next `getMailboxLock()` never returns
        console.log("CLIENT unlocked");
        if (lock) {
            lock.release();
        }
        console.log("CLIENT logout");
        if (client) {
            yield client.logout();
        }
    }
});
exports.imapFlowConnect = imapFlowConnect;
