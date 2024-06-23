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
const crypto = require("crypto");
const adminAuth_1 = require("../models/adminAuth");
const fs = require("fs");
const excel_1 = require("../services/excel");
const settings_1 = require("../models/settings");
class AuthController {
    constructor() {
        this.auth = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req.cookies);
                const { pass, login } = req.body;
                console.log(pass);
                console.log(login);
                if (!pass || !login) {
                    return res.status(400).send({ "code": 1, message: "Пустые данные" });
                }
                const passHash = crypto.createHash('sha256').update(pass).digest('hex');
                const fullInfo = yield adminAuth_1.default.findOne({
                    where: {
                        [adminAuth_1.AdminAuthRow.pass_hash]: passHash,
                        [adminAuth_1.AdminAuthRow.login]: login,
                    }
                });
                if (!fullInfo) {
                    return res.status(400).send({ "code": 10, message: "Неверные данные" });
                }
                return res.cookie('login', login, { httpOnly: true }).cookie('login', pass, { httpOnly: true }).status(200).send({ "code": 0, message: "Успешно" });
            }
            catch (error) {
                console.log(error);
                res.status(500).send(error);
            }
        });
        this.updateDb = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const file = req.file;
                if (!file) {
                    res.status(400).send("Нет файла");
                }
                const isUpdate = yield settings_1.default.findOne({
                    where: {
                        [settings_1.SettingsRow.name]: 'update'
                    }
                });
                if (isUpdate.value == 1) {
                    return res.status(400).send("База обновляется, подождите");
                }
                fs.writeFileSync(__dirname + "/../temp/" + file.originalname, file.buffer);
                excel_1.default.syncToDB(file.originalname);
                res.send(200);
            }
            catch (error) {
                res.status(500).send("no worker");
            }
        });
    }
}
exports.default = new AuthController();
