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
require('dotenv').config();
const express = require("express");
const app = express();
const http = require("http");
const fs = require("fs");
const path = require("path");
const mailer_1 = require("./services/mailer");
const initialize_1 = require("./services/initialize");
const dataRouter_1 = require("./routes/dataRouter");
const authRouter_1 = require("./routes/authRouter");
const adminPanelRouter_1 = require("./routes/adminPanelRouter");
const cors = require("cors");
const cron_1 = require("./services/cron");
app.use(express.json());
app.use(cors());
app.use("/api", dataRouter_1.default);
app.use("/api", authRouter_1.default);
app.use("/api", adminPanelRouter_1.default);
//imapFlowConnect();
//excel.parseInit()
const options = {
    key: fs.readFileSync(path.join(__dirname, 'privateKey.key')),
    cert: fs.readFileSync(path.join(__dirname, 'certificate.crt'))
};
const PORT = 3000;
http.createServer(app).listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, initialize_1.initialize)();
    setInterval(() => {
        (0, mailer_1.imapFlowConnect)();
    }, 1000 * 60);
    //imapFlowConnect()
    console.log(cron_1.mailWorker);
    console.log('HTTPS server running on https://localhost:3000');
}));
// const nameS = 'меня зовут ';
// let  name = 'Саша'
// const vozrastS = 'мне ';
// let  vozrast = 10
// let  vozrastk = ' лет'
// console.log(nameS+name);//это для имени
// console.log(vozrastS+vozrast+vozrastk);//это для возраста
