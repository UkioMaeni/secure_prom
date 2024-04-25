require('dotenv').config();
import express = require('express');
const app = express();
import https = require('https');
import fs = require('fs');
import path = require('path');
import { imapFlowConnect } from './services/mailer';
import excel from './services/excel';

app.use(express.json())
app.post("/",(req,res)=>{
    console.log(req);
    console.log(req.body);
    res.send("OK")
})
//imapFlowConnect();
excel.parseInit()
const options = {
    key: fs.readFileSync(path.join(__dirname, 'privateKey.key')),
    cert: fs.readFileSync(path.join(__dirname, 'certificate.crt'))
};
const PORT = 3000;
https.createServer(options, app).listen(PORT, () => {
    console.log('HTTPS server running on https://localhost:3000');
});
