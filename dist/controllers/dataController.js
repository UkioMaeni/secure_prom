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
const full_info_1 = require("../models/full_info");
const jurnal_1 = require("../models/jurnal");
class UserController {
    constructor() {
        this.getFullInfo = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const info = req.body["jurnal"];
                console.log(req.body);
                const fullInfo = yield full_info_1.default.findAll();
                res.send([]);
            }
            catch (error) {
                console.log(error);
                res.status(500).send(error);
            }
        });
        this.addJurnal = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const info = req.body["jurnal"];
                console.log(req.body);
                for (var element in info) {
                    jurnal_1.default.create({
                        [jurnal_1.JurnalRow.kpp]: element["kpp"],
                        [jurnal_1.JurnalRow.date]: element["date"],
                        [jurnal_1.JurnalRow.time]: element["time"],
                        [jurnal_1.JurnalRow.numberPassTS]: element["numberPassTS"],
                        [jurnal_1.JurnalRow.numberPassDriver]: element["numberPassDriver"],
                        [jurnal_1.JurnalRow.numberPassPassanger]: element["numberPassPassanger"],
                        [jurnal_1.JurnalRow.inputObject]: element["inputObject"],
                        [jurnal_1.JurnalRow.outputObject]: element["outputObject"],
                        [jurnal_1.JurnalRow.errors]: element["errors"],
                    });
                }
                info.forEach((element) => {
                });
                const fullInfo = yield full_info_1.default.findAll();
                res.send([]);
            }
            catch (error) {
                console.log(error);
                res.status(500).send(error);
            }
        });
    }
}
exports.default = new UserController();
