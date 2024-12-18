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
import { mailWorker, senderWorker, senderWorkerNew } from './services/cron';
import process = require('node:process');
import { sendJurnalAndDb } from './services/senderJurnalAndDb';
import {appVersionInfo} from "./config/app_version_current";
process.on('uncaughtException', (err, origin) => {
    console.log(err);
    console.log(origin);
    fs.writeSync(
      process.stderr.fd,
      `Caught exception: ${err}\n` +
      `Exception origin: ${origin}\n`,
    );
  });
app.use(express.json({limit:"50mb"}))
app.use(express.urlencoded({limit: '50mb',extended: true, parameterLimit:50000}));
app.use(cors()) 
app.use("/api",dataRouter)
app.use("/api",authRouter)
app.use("/api",adminPanelRouter)
//express.static(`${__dirname}/public/actualfile.apk`),
app.use(
  "/downloadfile",
  function(req, res) {
    const version =  req.query["version"]as string;
    if(!version){
      return res.status(400)
    }
    console.log(version);
    console.log(appVersionInfo);
    const [main,sub,cont]=version.split(".");
    if(appVersionInfo.main > parseInt(main)){
     return res.sendFile(`${__dirname}/public/actualfile.apk`);
    }
    if(appVersionInfo.main < parseInt(main)){
      return res.status(400)
    }
    if(appVersionInfo.sub > parseInt(sub)){
      return res.sendFile(`${__dirname}/public/actualfile.apk`);
     }
     if(appVersionInfo.sub < parseInt(sub)){
       return res.status(400)
     }
     if(appVersionInfo.cont > parseInt(cont)){
      return res.sendFile(`${__dirname}/public/actualfile.apk`);
     }
     if(appVersionInfo.cont < parseInt(cont)){
       return res.status(400)
     }
     return res.status(400)
  }
);
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
//imapFlowConnect()
  mailWorker.start()
  senderWorker.start()
  senderWorkerNew.start()
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

