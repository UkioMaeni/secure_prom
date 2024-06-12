require('dotenv').config();
import express = require('express');
const app = express();
import https = require('https');
import http = require('http');
import fs = require('fs');
import path = require('path');
import { imapFlowConnect } from './services/mailer';
import excel from './services/excel';
import { initialize } from './services/initialize';
import dataRouter from './routes/dataRouter';
import authRouter from './routes/authRouter';
import adminPanelRouter from './routes/adminPanelRouter';
import cors = require('cors');
import { mailWorker } from './services/cron';
app.use(express.json())
app.use(cors())
app.use("/api",dataRouter)
app.use("/api",authRouter)
app.use("/api",adminPanelRouter)
//imapFlowConnect();
//excel.parseInit()
const options = {
    key: fs.readFileSync(path.join(__dirname, 'privateKey.key')),
    cert: fs.readFileSync(path.join(__dirname, 'certificate.crt'))
};
const PORT = 3000;
http.createServer(app).listen(PORT, async() => {
   await initialize();
   setInterval(()=>{
    imapFlowConnect();
    },1000*60*5);
   //imapFlowConnect()
   console.log(mailWorker);
   
    console.log('HTTPS server running on https://localhost:3000');
});

// const nameS = 'меня зовут ';
// let  name = 'Саша'
// const vozrastS = 'мне ';
// let  vozrast = 10
// let  vozrastk = ' лет'

// console.log(nameS+name);//это для имени
// console.log(vozrastS+vozrast+vozrastk);//это для возраста

