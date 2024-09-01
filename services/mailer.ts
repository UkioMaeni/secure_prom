import fs = require('fs');

import mailparser = require('mailparser');
const MailParser = mailparser.MailParser;
import excelTool from "./excel"
var nodemailer = require('nodemailer')
enum ECommand{
    update,noCommand
}

type Command={
    "type":ECommand,
    
}

const Imap = require('imap'),
inspect = require('util').inspect;

    import { ImapFlow, MailboxObject,FetchMessageObject, MailboxLockObject } from 'imapflow';
import { MailParserOptions } from 'mailparser';
import Settings, { SettingsRow } from '../models/settings';
import WhiteEmailList, { WhiteEmailListRow } from '../models/whiteEmailList';
import excel from './excel';
    

const timer=async()=>{
    const promise = new Promise((resolve) => {
        setTimeout(resolve, 10000);
      });
      await promise;
}

export const imapFlowConnect=async()=>{
   
    
    
    // Select and lock a mailbox. Throws if mailbox does not exist
    let lock:MailboxLockObject|null;
    let client:ImapFlow|null;
    
    try {
        const client = new ImapFlow({
            host: 'imap.yandex.ru',
            port: 993,
            secure: true,
            auth: {
                user: 'secure.kpp@yandex.ru',
                pass: 'cenkzgotmstauzuy'
            },
            disableAutoIdle:true,
            logger:false,
            logRaw:false,
            emitLogs:false,
            greetingTimeout:5000
            
        });
        await client.connect();
        
           
         lock = await client.getMailboxLock('INBOX',);
        
        console.log(client.mailbox );
        const obj:MailboxObject=client.mailbox as MailboxObject;
        console.log(obj.exists);
        const lastMessage= await Settings.findOne({
                where:{
                    [SettingsRow.name]:'lastMail'
                }
            })
            console.log(lastMessage.value);
            const pullUuid:Array<Command>=[]
            
            
            
            if(obj.exists>lastMessage.value){

                for(let messageCounter=lastMessage.value+1;messageCounter<=obj.exists;messageCounter++){
                    
                    console.log(messageCounter.toString());
                    let mailParams = await client.fetchOne(messageCounter.toString(), { uid:true,envelope:true,bodyStructure:true });
                    console.log("mailParams");
                    console.log(mailParams);
                    if(typeof(mailParams) == "boolean"){
                        continue;
                    }
                    const address=mailParams.envelope.from[0].address;
                    console.log(address);
                    
                    if(!address){
                        continue;
                    }
                    const find=await WhiteEmailList.findOne({
                        where:{
                            [WhiteEmailListRow.email]:address
                        }
                    })
                    if(!find){
                        continue;
                    }
                    console.log("FIND");
                    
                    let textCommand:boolean=false;
                    let textCommandType:ECommand=ECommand.noCommand;
                    let fileCommand:boolean=false;
                    let fileName:string="";
                    let encoding:string="";
                    let bodyParts:Array<string>=[];
                    const childNodes=mailParams.bodyStructure.childNodes;
                    childNodes.forEach((element)=>{
                        if(element.part=='1'){
                            console.log(element.childNodes);
                            element.childNodes.forEach((nodes)=>{
                                if(nodes.type=="text/plain"){
                                    textCommand=true;
                                    bodyParts.push(nodes.part)
                                }
                            })
                            
                        }
                        if(element.part=="2"){
                            if(element.disposition=='attachment'){
                                 fileCommand=true;
                                 fileName=element.dispositionParameters['filename']
                                 encoding=element.encoding;
                                 bodyParts.push("2")
                            }
                        }
                    })
                    console.log(bodyParts);
                    
                    let messageFullContent = await client.fetchOne(messageCounter.toString(), { source: true,uid:true,bodyStructure:true,headers:false,bodyParts:bodyParts,envelope:true });

                    const textInMessage= messageFullContent.bodyParts.get(bodyParts[0]).toString()
                    if(textInMessage.includes("update")){
                        textCommandType=ECommand.update
                    }
                    if(textCommandType==ECommand.noCommand){
                        continue;
                    }
                    if(textCommandType==ECommand.update&&fileCommand&&textCommand){
                        
                        const buffer = Buffer.from(messageFullContent.bodyParts.get(bodyParts[1]).toString('utf8'), 'base64');
                        console.log(__dirname);
                      
                         fs.writeFileSync(__dirname+"/../temp/"+"base.xlsx",buffer)
                         
                         await excel.syncToDB("base.xlsx");
                        
                    }else{
                        continue;
                    }
                    
                }
                await Settings.update({
                    [SettingsRow.value]:obj.exists
                },{
                    where:{
                        [SettingsRow.name]:'lastMail'
                    }
                }
                ) 
            }
        
       
    }catch(e){
        console.log("error in mailer");

        
        console.error(e);
    } finally {
        // Make sure lock is released, otherwise next `getMailboxLock()` never returns
        console.log("CLIENT unlocked");
            if(lock){
                lock.release();
            }
            
            console.log("CLIENT logout");
            if(client){
                await client.logout();
            }
        
    }

    
}    


export const sendMail=async(pathJurnal:string,nameJurnal:string)=>{
   try {

    const email = await WhiteEmailList.findOne()
    console.log(email.email);
    
    if(!email) return;
    const transporter = nodemailer.createTransport({
        service:"yandex",
        auth: {
          user: 'secure.kpp@yandex.ru',
          pass: 'cenkzgotmstauzuy',
        }
      });
        const message = {
                from: "secure.kpp@yandex.ru",
                to: email.email,
                subject: 'Журнал и база',
                text: "Отчет",
                attachments:[
                    {   
                        filename: nameJurnal,
                        path: pathJurnal 
                    },
                ]
            };
        await transporter.sendMail(message,(err: any)=>{
                console.log(err);
                
            });
   } catch (error) {
    console.log(error);
    
   }
}