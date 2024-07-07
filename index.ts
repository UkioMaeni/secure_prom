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
import { mailWorker, senderWorker } from './services/cron';
import process = require('node:process');
import { sendJurnalAndDb } from './services/senderJurnalAndDb';

process.on('uncaughtException', (err, origin) => {
    console.log(err);
    console.log(origin);
    fs.writeSync(
      process.stderr.fd,
      `Caught exception: ${err}\n` +
      `Exception origin: ${origin}\n`,
    );
  });
app.use(express.json())
app.use(cors())
app.use("/api",dataRouter)
app.use("/api",authRouter)
app.use("/api",adminPanelRouter)
//imapFlowConnect();
//excel.parseInit()
// const options = {
//     key: fs.readFileSync(path.join(__dirname, 'privateKey.key')),
//     cert: fs.readFileSync(path.join(__dirname, 'certificate.crt'))
// };
const PORT = process.env.PORT;
http.createServer(app).listen(PORT, async() => {
   await initialize();
  //  imapFlowConnect();
  //  setInterval(()=>{
  //   imapFlowConnect();
  //   },1000*60);
  console.log(senderWorker);
//  sendJurnalAndDb();
  mailWorker.start()
  senderWorker.start()
   //imapFlowConnect()
    //excel.createJurnalAndDb();
    console.log('HTTPS server running on https://localhost:'+PORT);
});

// const nameS = 'меня зовут ';
// let  name = 'Саша'
// const vozrastS = 'мне ';
// let  vozrast = 10
// let  vozrastk = ' лет'

// console.log(nameS+name);//это для имени
// console.log(vozrastS+vozrast+vozrastk);//это для возраста

