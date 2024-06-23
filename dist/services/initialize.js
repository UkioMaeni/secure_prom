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
exports.initialize = void 0;
const full_info_1 = require("../models/full_info");
const auth_1 = require("../models/auth");
const whiteEmailList_1 = require("../models/whiteEmailList");
const adminAuth_1 = require("../models/adminAuth");
const settings_1 = require("../models/settings");
function initialize() {
    return __awaiter(this, void 0, void 0, function* () {
        yield settings_1.default.sync();
        yield settings_1.default.findOrCreate({
            where: {
                [settings_1.SettingsRow.name]: 'lastMail'
            },
            defaults: {
                [settings_1.SettingsRow.name]: 'lastMail',
                [settings_1.SettingsRow.value]: 11069
            }
        });
        yield settings_1.default.findOrCreate({
            where: {
                [settings_1.SettingsRow.name]: 'update'
            },
            defaults: {
                [settings_1.SettingsRow.name]: 'update',
                [settings_1.SettingsRow.value]: 0
            }
        });
        yield settings_1.default.update({
            [settings_1.SettingsRow.value]: 0
        }, {
            where: {
                [settings_1.SettingsRow.name]: 'update'
            }
        });
        yield whiteEmailList_1.default.sync();
        yield whiteEmailList_1.default.findOrCreate({
            where: {
                [whiteEmailList_1.WhiteEmailListRow.email]: 'priz.a47@gmail.com'
            }, defaults: {
                [whiteEmailList_1.WhiteEmailListRow.email]: 'priz.a47@gmail.com'
            }
        });
        yield auth_1.default.sync();
        yield adminAuth_1.default.sync();
        yield adminAuth_1.default.findOrCreate({
            where: {
                [adminAuth_1.AdminAuthRow.login]: "root"
            },
            defaults: {
                [adminAuth_1.AdminAuthRow.login]: "root",
                [adminAuth_1.AdminAuthRow.pass_hash]: "4813494d137e1631bba301d5acab6e7bb7aa74ce1185d456565ef51d737677b2"
            }
        });
        yield auth_1.default.findOrCreate({
            where: {
                [auth_1.AuthRow.pass_hash]: "65e84be33532fb784c48129675f9eff3a682b27168c0ea744b2cf58ee02337c5"
            },
            defaults: {
                [auth_1.AuthRow.pass_hash]: "65e84be33532fb784c48129675f9eff3a682b27168c0ea744b2cf58ee02337c5"
            }
        });
        yield full_info_1.default.sync({ alter: true });
        return;
    });
}
exports.initialize = initialize;
