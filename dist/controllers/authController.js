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
const auth_1 = require("../models/auth");
const crypto = require("crypto");
class AuthController {
    constructor() {
        this.auth = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { pass } = req.body;
                if (!pass) {
                    return res.status(400).send({ "code": 1, message: "Пустые данные" });
                }
                const passHash = crypto.createHash('sha256').update(pass).digest('hex');
                const fullInfo = yield auth_1.default.findOne({
                    where: {
                        [auth_1.AuthRow.pass_hash]: passHash
                    }
                });
                if (!fullInfo) {
                    return res.status(400).send({ "code": 10, message: "Неверный пароль" });
                }
                return res.status(200).send({ "code": 0, message: "Успешно" });
            }
            catch (error) {
                console.log(error);
                res.status(500).send(error);
            }
        });
    }
}
exports.default = new AuthController();
