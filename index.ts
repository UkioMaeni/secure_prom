require('dotenv').config();
import express = require('express');
const app = express();
import https = require('https');
import fs = require('fs');
import path = require('path');
import { imapFlowConnect } from './services/mailer';
import excel from './services/excel';
import { initialize } from './services/initialize';

app.use(express.json())
app.post("/",(req,res)=>{
    console.log(req);
    console.log(req.body);
    res.send("OK")
})
//imapFlowConnect();
//excel.parseInit()
const options = {
    key: fs.readFileSync(path.join(__dirname, 'privateKey.key')),
    cert: fs.readFileSync(path.join(__dirname, 'certificate.crt'))
};
const PORT = 3000;
https.createServer(options, app).listen(PORT, () => {
    initialize();
    console.log('HTTPS server running on https://localhost:3000');
});
// const nameS = 'меня зовут ';
// let  name = 'Саша'
// const vozrastS = 'мне ';
// let  vozrast = 10
// let  vozrastk = ' лет'

// console.log(nameS+name);//это для имени
// console.log(vozrastS+vozrast+vozrastk);//это для возраста

