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
const xlsx = require("xlsx");
const path = require("path");
const workInfo_1 = require("../models/workInfo");
const fs = require("fs");
const full_info_1 = require("../models/full_info");
const settings_1 = require("../models/settings");
class ExcelTOOL {
    constructor() {
        this.syncToDB = (pathToFile) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, _23, _24, _25, _26, _27, _28, _29, _30, _31, _32, _33, _34, _35, _36, _37, _38, _39, _40, _41, _42, _43, _44, _45, _46, _47;
            try {
                yield settings_1.default.update({
                    [settings_1.SettingsRow.value]: 1,
                }, {
                    where: {
                        [settings_1.SettingsRow.name]: "update",
                    }
                });
                const workBook = xlsx.readFile(path.join(__dirname + "/../temp/" + pathToFile));
                const sheet = workBook.Sheets['Лист1'];
                const dataCount = sheet["!ref"].split(":");
                const regex = /\d+/;
                const match = dataCount[1].match(regex);
                yield full_info_1.default.truncate();
                let endRow = 0;
                if (match) {
                    const number = parseInt(match[0]);
                    console.log(number);
                    endRow = number;
                }
                else {
                    console.log('No number found');
                }
                for (let j = 3; j <= endRow; j++) {
                    const fullName = (_b = (_a = sheet["A" + j]) === null || _a === void 0 ? void 0 : _a["w"]) !== null && _b !== void 0 ? _b : null;
                    const propuskNumber = (_d = (_c = sheet["B" + j]) === null || _c === void 0 ? void 0 : _c["w"]) !== null && _d !== void 0 ? _d : null;
                    const organization = (_f = (_e = sheet["C" + j]) === null || _e === void 0 ? void 0 : _e["w"]) !== null && _f !== void 0 ? _f : null;
                    const professionals = (_h = (_g = sheet["D" + j]) === null || _g === void 0 ? void 0 : _g["w"]) !== null && _h !== void 0 ? _h : null;
                    //
                    const medical = (_k = (_j = sheet["E" + j]) === null || _j === void 0 ? void 0 : _j["w"]) !== null && _k !== void 0 ? _k : null;
                    const promSecure = (_m = (_l = sheet["F" + j]) === null || _l === void 0 ? void 0 : _l["w"]) !== null && _m !== void 0 ? _m : null;
                    const promSecureOblast = (_p = (_o = sheet["G" + j]) === null || _o === void 0 ? void 0 : _o["w"]) !== null && _p !== void 0 ? _p : null; //new
                    const infoSecure = (_r = (_q = sheet["H" + j]) === null || _q === void 0 ? void 0 : _q["w"]) !== null && _r !== void 0 ? _r : null;
                    const workSecure = (_t = (_s = sheet["I" + j]) === null || _s === void 0 ? void 0 : _s["w"]) !== null && _t !== void 0 ? _t : null;
                    const medicalHelp = (_v = (_u = sheet["J" + j]) === null || _u === void 0 ? void 0 : _u["w"]) !== null && _v !== void 0 ? _v : null;
                    const fireSecure = (_x = (_w = sheet["K" + j]) === null || _w === void 0 ? void 0 : _w["w"]) !== null && _x !== void 0 ? _x : null;
                    const electroSecureGroup = (_z = (_y = sheet["L" + j]) === null || _y === void 0 ? void 0 : _y["w"]) !== null && _z !== void 0 ? _z : null; //new
                    const electroSecure = (_1 = (_0 = sheet["M" + j]) === null || _0 === void 0 ? void 0 : _0["w"]) !== null && _1 !== void 0 ? _1 : null; //new
                    const driverPermit = (_3 = (_2 = sheet["N" + j]) === null || _2 === void 0 ? void 0 : _2["w"]) !== null && _3 !== void 0 ? _3 : null; //new
                    const winterDriver = (_5 = (_4 = sheet["O" + j]) === null || _4 === void 0 ? void 0 : _4["w"]) !== null && _5 !== void 0 ? _5 : null;
                    const workInHeight = (_7 = (_6 = sheet["P" + j]) === null || _6 === void 0 ? void 0 : _6["w"]) !== null && _7 !== void 0 ? _7 : null;
                    const workInHeightGroup = (_9 = (_8 = sheet["Q" + j]) === null || _8 === void 0 ? void 0 : _8["w"]) !== null && _9 !== void 0 ? _9 : null;
                    const GPVPGroup = (_11 = (_10 = sheet["R" + j]) === null || _10 === void 0 ? void 0 : _10["w"]) !== null && _11 !== void 0 ? _11 : null;
                    const GNVPGroup = (_13 = (_12 = sheet["S" + j]) === null || _12 === void 0 ? void 0 : _12["w"]) !== null && _13 !== void 0 ? _13 : null;
                    const VOZTest = (_15 = (_14 = sheet["T" + j]) === null || _14 === void 0 ? void 0 : _14["w"]) !== null && _15 !== void 0 ? _15 : null;
                    const VOZProfessional = (_17 = (_16 = sheet["U" + j]) === null || _16 === void 0 ? void 0 : _16["w"]) !== null && _17 !== void 0 ? _17 : null;
                    //new->
                    const burAndVSR = (_19 = (_18 = sheet["V" + j]) === null || _18 === void 0 ? void 0 : _18["w"]) !== null && _19 !== void 0 ? _19 : null;
                    const KSAndCMP = (_21 = (_20 = sheet["W" + j]) === null || _20 === void 0 ? void 0 : _20["w"]) !== null && _21 !== void 0 ? _21 : null;
                    const transport = (_23 = (_22 = sheet["X" + j]) === null || _22 === void 0 ? void 0 : _22["w"]) !== null && _23 !== void 0 ? _23 : null;
                    const energy = (_25 = (_24 = sheet["Y" + j]) === null || _24 === void 0 ? void 0 : _24["w"]) !== null && _25 !== void 0 ? _25 : null;
                    const GT = (_27 = (_26 = sheet["Z" + j]) === null || _26 === void 0 ? void 0 : _26["w"]) !== null && _27 !== void 0 ? _27 : null;
                    const PPDU = (_29 = (_28 = sheet["AA" + j]) === null || _28 === void 0 ? void 0 : _28["w"]) !== null && _29 !== void 0 ? _29 : null;
                    const CA = (_31 = (_30 = sheet["AB" + j]) === null || _30 === void 0 ? void 0 : _30["w"]) !== null && _31 !== void 0 ? _31 : null;
                    const KP_2 = (_33 = (_32 = sheet["AC" + j]) === null || _32 === void 0 ? void 0 : _32["w"]) !== null && _33 !== void 0 ? _33 : null;
                    const PB_11 = (_35 = (_34 = sheet["AD" + j]) === null || _34 === void 0 ? void 0 : _34["w"]) !== null && _35 !== void 0 ? _35 : null;
                    const PB_12 = (_37 = (_36 = sheet["AE" + j]) === null || _36 === void 0 ? void 0 : _36["w"]) !== null && _37 !== void 0 ? _37 : null;
                    //end
                    const lastInputDate = (_39 = (_38 = sheet["AK" + j]) === null || _38 === void 0 ? void 0 : _38["w"]) !== null && _39 !== void 0 ? _39 : null;
                    const lastInputKPP = (_41 = (_40 = sheet["AL" + j]) === null || _40 === void 0 ? void 0 : _40["w"]) !== null && _41 !== void 0 ? _41 : null;
                    const medicalType = (_43 = (_42 = sheet["AJ" + j]) === null || _42 === void 0 ? void 0 : _42["w"]) !== null && _43 !== void 0 ? _43 : null;
                    const passDate = (_45 = (_44 = sheet["AM" + j]) === null || _44 === void 0 ? void 0 : _44["w"]) !== null && _45 !== void 0 ? _45 : null;
                    const passStatus = (_47 = (_46 = sheet["AN" + j]) === null || _46 === void 0 ? void 0 : _46["w"]) !== null && _47 !== void 0 ? _47 : null;
                    yield full_info_1.default.create({
                        [full_info_1.FullInfoRow.fullName]: fullName,
                        [full_info_1.FullInfoRow.propuskNumber]: propuskNumber,
                        [full_info_1.FullInfoRow.organization]: organization,
                        [full_info_1.FullInfoRow.professionals]: professionals,
                        [full_info_1.FullInfoRow.medical]: medical,
                        [full_info_1.FullInfoRow.promSecure]: promSecure,
                        [full_info_1.FullInfoRow.infoSecure]: infoSecure,
                        [full_info_1.FullInfoRow.workSecure]: workSecure,
                        [full_info_1.FullInfoRow.medicalHelp]: medicalHelp,
                        [full_info_1.FullInfoRow.fireSecure]: fireSecure,
                        [full_info_1.FullInfoRow.winterDriver]: winterDriver,
                        [full_info_1.FullInfoRow.workInHeight]: workInHeight,
                        [full_info_1.FullInfoRow.workInHeightGroup]: workInHeightGroup,
                        [full_info_1.FullInfoRow.GPVPGroup]: GPVPGroup,
                        [full_info_1.FullInfoRow.GNVPGroup]: GNVPGroup,
                        [full_info_1.FullInfoRow.VOZTest]: VOZTest,
                        [full_info_1.FullInfoRow.VOZProfessional]: VOZProfessional,
                        [full_info_1.FullInfoRow.promSecureOblast]: promSecureOblast,
                        [full_info_1.FullInfoRow.electroSecureGroup]: electroSecureGroup,
                        [full_info_1.FullInfoRow.electroSecure]: electroSecure,
                        [full_info_1.FullInfoRow.driverPermit]: driverPermit,
                        [full_info_1.FullInfoRow.burAndVSR]: burAndVSR,
                        [full_info_1.FullInfoRow.KSAndCMP]: KSAndCMP,
                        [full_info_1.FullInfoRow.transport]: transport,
                        [full_info_1.FullInfoRow.energy]: energy,
                        [full_info_1.FullInfoRow.GT]: GT,
                        [full_info_1.FullInfoRow.PPDU]: PPDU,
                        [full_info_1.FullInfoRow.CA]: CA,
                        [full_info_1.FullInfoRow.KP_2]: KP_2,
                        [full_info_1.FullInfoRow.PB_11]: PB_11,
                        [full_info_1.FullInfoRow.PB_12]: PB_12,
                        [full_info_1.FullInfoRow.medicalType]: medicalType,
                        [full_info_1.FullInfoRow.lastInputDate]: lastInputDate,
                        [full_info_1.FullInfoRow.lastInputKPP]: lastInputKPP,
                        [full_info_1.FullInfoRow.passStatus]: passStatus,
                        [full_info_1.FullInfoRow.passDate]: passDate,
                    });
                }
            }
            catch (error) {
                console.log(error);
            }
            finally {
                yield settings_1.default.update({
                    [settings_1.SettingsRow.value]: 0,
                }, {
                    where: {
                        [settings_1.SettingsRow.name]: "update",
                    }
                });
            }
        });
    }
    requiredDocData(xlsx) {
        console.log(xlsx["A1"]["w"]);
        console.log(xlsx["A2"]["w"]);
        return xlsx["A1"]["w"] == "Имя" &&
            xlsx["B1"]["w"] == "номер";
    }
    parceExcel(xlsx) {
        xlsx;
    }
    toDB(data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield workInfo_1.default.truncate();
            workInfo_1.default.bulkCreate(data);
        });
    }
    parseInit() {
        return __awaiter(this, void 0, void 0, function* () {
            const wb = xlsx.readFile(path.join(__dirname, '../file.xlsx'));
            const flagName = Date.now();
            fs.copyFileSync(path.join(__dirname, '../empty.xlsx'), path.join(__dirname, `../${flagName}.xlsx`));
            const mySheet = wb.Sheets['Лист1'];
            //console.log(mySheet);
            const requireValid = this.requiredDocData(mySheet);
            const dataCount = mySheet["!ref"].split(":");
            const regex = /\d+/;
            const match = dataCount[1].match(regex);
            let endRow = 0;
            if (match) {
                const number = parseInt(match[0]);
                console.log(number);
                endRow = number;
            }
            else {
                console.log('No number found');
            }
            const data = [];
            for (let i = 2; i <= endRow; i++) {
                if (mySheet[`A${i}`] && mySheet[`B${i}`]) {
                    data.push({ name: mySheet[`A${i}`]["w"], serialNumber: mySheet[`B${i}`]["w"] });
                }
            }
            yield this.toDB(data);
            //  fs.writeFileSync(path.join(__dirname, '../fiadsad.xlsx'),"");
            const sheet = wb.Sheets['Лист1'];
            sheet['!ref'] = `A1:B${data.length + 1}`;
            sheet['A1'] = { t: 's', v: 'Имя', r: '<t>Имя</t>', h: 'Имя', w: 'Имя' };
            //console.log(sheet);
            let newWb = xlsx.readFile(path.join(__dirname, `../${flagName}.xlsx`));
            let newsheet = newWb.Sheets['Лист1'];
            const formattedData = [];
            formattedData.push(["Имя", "номер"]);
            data.forEach(el => {
                formattedData.push([el.name, el.serialNumber]);
            });
            newsheet = xlsx.utils.aoa_to_sheet(formattedData);
            //const wbb=xlsx.utils.table_to_book()
            // console.log(w1);
            newWb.Sheets["Лист1"] = newsheet;
            xlsx.writeFile(newWb, path.join(__dirname, `../${flagName}.xlsx`));
            // console.log(data);
            //req
        });
    }
}
exports.default = new ExcelTOOL();
