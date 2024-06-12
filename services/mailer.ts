import fs = require('fs');

import mailparser = require('mailparser');
const MailParser = mailparser.MailParser;
import excelTool from "./excel"

enum ECommand{
    update,noCommand
}

type Command={
    "type":ECommand,
    
}

const Imap = require('imap'),
inspect = require('util').inspect;

    import { ImapFlow, MailboxObject,FetchMessageObject } from 'imapflow';
import { MailParserOptions } from 'mailparser';
import Settings, { SettingsRow } from '../models/settings';
import WhiteEmailList, { WhiteEmailListRow } from '../models/whiteEmailList';
import excel from './excel';
    const client = new ImapFlow({
        host: 'imap.yandex.ru',
        port: 993,
        secure: true,
        auth: {
            user: 'priz.a@yandex.ru',
            pass: '89045462751'
        },
        disableAutoIdle:true,
        logger:false,
        logRaw:false,
        emitLogs:false,
        greetingTimeout:30000
        
    });
export const imapFlowConnect=async()=>{
   
    await client.connect();
    
    // Select and lock a mailbox. Throws if mailbox does not exist
    let lock = await client.getMailboxLock('INBOX',);
    try {
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
                      
                         fs.writeFileSync(__dirname+"/../temp/"+fileName,buffer)
                         
                         await excel.syncToDB(fileName);
                        
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
        console.error(e);
    } finally {
        // Make sure lock is released, otherwise next `getMailboxLock()` never returns
        console.log("CLIENT unlocked");
        
        lock.release();
        console.log("CLIENT logout");
        await client.logout();
    }

    
}    
