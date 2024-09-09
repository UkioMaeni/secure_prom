import xlsx = require('xlsx');
import path = require('path');
import WorkInfo from '../models/workInfo';
import fs = require('fs');
import FullInfo, { FullInfoRow } from '../models/full_info';
import Settings, { SettingsRow } from '../models/settings';
import Jurnal from '../models/jurnal';
import { sendMail } from './mailer';
import XlsxPopulate = require('xlsx-populate');
import sequelize from '../db/postgres/postgresDb';
class ExcelTOOL{
    private requiredDocData(xlsx:xlsx.WorkSheet):boolean{
        console.log(xlsx["A1"]["w"]);
        console.log(xlsx["A2"]["w"]);
        
        return  xlsx["A1"]["w"]=="Имя"&&
                xlsx["B1"]["w"]=="номер";
    }
    private parceExcel(xlsx:xlsx.WorkSheet){
        xlsx
    }
    private async toDB(data:Array<{name:string,serialNumber:string}>){
       await WorkInfo.truncate()
        WorkInfo.bulkCreate(data);
    }
    async parseInit(){
        const wb= xlsx.readFile(path.join(__dirname, '../file.xlsx'))
        const flagName=Date.now()
        fs.copyFileSync(path.join(__dirname, '../empty.xlsx'),path.join(__dirname, `../${flagName}.xlsx`));
        
        const mySheet = wb.Sheets['Лист1'];
        //console.log(mySheet);
        const requireValid:boolean=this.requiredDocData(mySheet);
        const dataCount=mySheet["!ref"].split(":");
        const regex = /\d+/;
        const match = dataCount[1].match(regex);
        let endRow:number=0;
        if (match) {
            const number = parseInt(match[0]);
            console.log(number); 
            endRow=number;
          } else {
            console.log('No number found');
          }
          const data:Array<{name:string,serialNumber:string}>=[]

        for(let i=2;i<=endRow;i++){
            if(mySheet[`A${i}`]&&mySheet[`B${i}`]){
                data.push({name:mySheet[`A${i}`]["w"],serialNumber:mySheet[`B${i}`]["w"]})
            }
        }
        await this.toDB(data);
      //  fs.writeFileSync(path.join(__dirname, '../fiadsad.xlsx'),"");
        
        const sheet = wb.Sheets['Лист1'];
        sheet['!ref'] = `A1:B${data.length+1}`;
        sheet['A1']={ t: 's', v: 'Имя', r: '<t>Имя</t>', h: 'Имя', w: 'Имя' }
        //console.log(sheet);
        let newWb= xlsx.readFile(path.join(__dirname, `../${flagName}.xlsx`))
        let newsheet = newWb.Sheets['Лист1'];
        const formattedData=[];
        formattedData.push(["Имя","номер"]);
        data.forEach(el=>{
            formattedData.push([el.name,el.serialNumber]) 
        })
         newsheet=xlsx.utils.aoa_to_sheet(formattedData)
        //const wbb=xlsx.utils.table_to_book()
       // console.log(w1);
        newWb.Sheets["Лист1"]=newsheet;
        xlsx.writeFile(newWb,path.join(__dirname, `../${flagName}.xlsx`));
       // console.log(data);
        
        //req
    }
    syncToDB=async(pathToFile:string):Promise<void>=>{
        const transaction = await sequelize.transaction()
       try {
        const setting=  await Settings.findOne({
            where:{
                [SettingsRow.name]:"update"
            }
        });
        console.log(setting);
        
        if(!setting||setting.value==1){
            return;
        }
        await Settings.update({
            [SettingsRow.value]:1,
        },{
            where:{
                [SettingsRow.name]:"update",
            }
        })
        console.log("start parsing");
        
    const workBook= xlsx.readFile(path.join(__dirname+"/../temp/"+pathToFile))
    
    
    const sheet = workBook.Sheets['Лист1'];
    const dataCount=sheet["!ref"].split(":");
    const regex = /\d+/;
    const match = dataCount[1].match(regex);
    
    let endRow:number=0;
    if (match) {
        const number = parseInt(match[0]);
        console.log(number); 
        endRow=number;
        console.log(endRow);
        
        } else {
        console.log('No number found');
        }
        let fullInfoList:Array<FullInfo>=[] 
        fullInfoList=await FullInfo.findAll()
        console.log(fullInfoList.length);
        
        await FullInfo.truncate({transaction});
        for(let j=3;j<=endRow;j++){
        
            const fullName=sheet["A"+j]?.["w"]??null;
            const propuskNumber=sheet["B"+j]?.["w"]??null;
            if(!propuskNumber) continue;
            const organization=sheet["C"+j]?.["w"]??null;
            const professionals=sheet["D"+j]?.["w"]??null;
            //
            
            let medical=sheet["E"+j]?.["w"]??null;
            if(medical!=null && sheet["AJ"+j]?.["w"]!=null){

                let parts = medical.split("/");
                const lastNum = parseInt(parts[parts.length - 1]);
                const addedYear=parseInt(sheet["AJ"+j]?.["w"])
                const sum =lastNum+addedYear;
                const updatedStr = parts.slice(0, parts.length - 1).join("/") + "/" + sum;
                medical=updatedStr;
                //console.log(updatedStr);
            }
            
            let promSecure=sheet["F"+j]?.["w"]??null;
            if(promSecure && sheet["F2"]?.["w"]!=null){
                console.log(promSecure);
                const date=new Date();
                date.setFullYear(parseInt("20"+promSecure.split("/")[2]));
                date.setMonth(parseInt(promSecure.split("/")[0])-1);
                date.setDate(parseInt(promSecure.split("/")[1]))
                //const date = new Date(parseInt("20"+promSecure.split("/")[2]), parseInt(promSecure.split("/")[0])-1, parseInt(promSecure.split("/")[1]));
                console.log(date);
                const addedMonth=parseInt(sheet["F2"]?.["w"])
                date.setMonth(date.getMonth()+addedMonth)
                console.log(date);
                
                const year=date.getFullYear().toString().slice(2);
                const updatedStr = (date.getMonth()+1)+"/"+date.getDate()+"/"+year
                promSecure=updatedStr;
                
                
            }

            const promSecureOblast=sheet["G"+j]?.["w"]??null; //new
            let infoSecure=sheet["H"+j]?.["w"]??null;
            if(infoSecure && sheet["H2"]?.["w"]!=null){
                const date=new Date();
                date.setFullYear(parseInt("20"+infoSecure.split("/")[2]));
                date.setMonth(parseInt(infoSecure.split("/")[0])-1);
                date.setDate(parseInt(infoSecure.split("/")[1]))
                const addedMonth=parseInt(sheet["H2"]?.["w"])
                date.setMonth(date.getMonth()+addedMonth)
                const year=date.getFullYear().toString().slice(2);
                const updatedStr = (date.getMonth()+1)+"/"+date.getDate()+"/"+year
                infoSecure=updatedStr;
            }
            let workSecure=sheet["I"+j]?.["w"]??null;//---
            if(workSecure && sheet["I2"]?.["w"]!=null){
                const date=new Date();
                date.setFullYear(parseInt("20"+workSecure.split("/")[2]));
                date.setMonth(parseInt(workSecure.split("/")[0])-1);
                date.setDate(parseInt(workSecure.split("/")[1]))
                const addedMonth=parseInt(sheet["I2"]?.["w"])
                date.setMonth(date.getMonth()+addedMonth)
                const year=date.getFullYear().toString().slice(2);
                const updatedStr = (date.getMonth()+1)+"/"+date.getDate()+"/"+year
                workSecure=updatedStr;
            }
            let medicalHelp=sheet["J"+j]?.["w"]??null;
            if(medicalHelp && sheet["J2"]?.["w"]!=null){
                const date=new Date();
                date.setFullYear(parseInt("20"+medicalHelp.split("/")[2]));
                date.setMonth(parseInt(medicalHelp.split("/")[0])-1);
                date.setDate(parseInt(medicalHelp.split("/")[1]))
                const addedMonth=parseInt(sheet["J2"]?.["w"])
                date.setMonth(date.getMonth()+addedMonth)
                const year=date.getFullYear().toString().slice(2);
                const updatedStr = (date.getMonth()+1)+"/"+date.getDate()+"/"+year
                medicalHelp=updatedStr;
            }
            let fireSecure=sheet["K"+j]?.["w"]??null;
            if(fireSecure && sheet["K2"]?.["w"]!=null){
                const date=new Date();
                date.setFullYear(parseInt("20"+fireSecure.split("/")[2]));
                date.setMonth(parseInt(fireSecure.split("/")[0])-1);
                date.setDate(parseInt(fireSecure.split("/")[1]))
                const addedMonth=parseInt(sheet["K2"]?.["w"])
                date.setMonth(date.getMonth()+addedMonth)
                const year=date.getFullYear().toString().slice(2);
                const updatedStr = (date.getMonth()+1)+"/"+date.getDate()+"/"+year
                fireSecure=updatedStr;
            }
            
            let electroSecure=sheet["L"+j]?.["w"]??null;//new
            if(electroSecure && sheet["L2"]?.["w"]!=null){
                const date=new Date();
                date.setFullYear(parseInt("20"+electroSecure.split("/")[2]));
                date.setMonth(parseInt(electroSecure.split("/")[0])-1);
                date.setDate(parseInt(electroSecure.split("/")[1]))
                const addedMonth=parseInt(sheet["L2"]?.["w"])
                date.setMonth(date.getMonth()+addedMonth)
                const year=date.getFullYear().toString().slice(2);
                const updatedStr = (date.getMonth()+1)+"/"+date.getDate()+"/"+year
                electroSecure=updatedStr;
            }
            const electroSecureGroup=sheet["M"+j]?.["w"]??null;//new
            const driverPermit=sheet["N"+j]?.["w"]??null;//new
            let winterDriver=sheet["O"+j]?.["w"]??null;
            if(winterDriver){
                const date=new Date();
                date.setFullYear(parseInt("20"+winterDriver.split("/")[2]));
                date.setMonth(parseInt(winterDriver.split("/")[0])-1);
                date.setDate(parseInt(winterDriver.split("/")[1]))
                const addedMonth=0
                date.setMonth(date.getMonth()+addedMonth)
                const year=date.getFullYear().toString().slice(2);
                const updatedStr = (date.getMonth()+1)+"/"+date.getDate()+"/"+year
                winterDriver=updatedStr;
            }
            let workInHeight=sheet["P"+j]?.["w"]??null;
            if(workInHeight && sheet["P2"]?.["w"]!=null){
                const date=new Date();
                date.setFullYear(parseInt("20"+workInHeight.split("/")[2]));
                date.setMonth(parseInt(workInHeight.split("/")[0])-1);
                date.setDate(parseInt(workInHeight.split("/")[1]))
                const addedMonth=parseInt(sheet["P2"]?.["w"])
                date.setMonth(date.getMonth()+addedMonth)
                const year=date.getFullYear().toString().slice(2);
                const updatedStr = (date.getMonth()+1)+"/"+date.getDate()+"/"+year
                workInHeight=updatedStr;
            }
            const workInHeightGroup=sheet["Q"+j]?.["w"]??null;
            let GPVPGroup=sheet["R"+j]?.["w"]??null;
            if(GPVPGroup && sheet["R2"]?.["w"]!=null){
                const date=new Date();
                date.setFullYear(parseInt("20"+GPVPGroup.split("/")[2]));
                date.setMonth(parseInt(GPVPGroup.split("/")[0])-1);
                date.setDate(parseInt(GPVPGroup.split("/")[1]))
                const addedMonth=parseInt(sheet["R2"]?.["w"])
                date.setMonth(date.getMonth()+addedMonth)
                const year=date.getFullYear().toString().slice(2);
                const updatedStr = (date.getMonth()+1)+"/"+date.getDate()+"/"+year
                GPVPGroup=updatedStr;
            }
            let GNVPGroup=sheet["S"+j]?.["w"]??null;
            if(GNVPGroup && sheet["S2"]?.["w"]!=null){
                const date=new Date();
                date.setFullYear(parseInt("20"+GNVPGroup.split("/")[2]));
                date.setMonth(parseInt(GNVPGroup.split("/")[0])-1);
                date.setDate(parseInt(GNVPGroup.split("/")[1]))
                const addedMonth=parseInt(sheet["S2"]?.["w"])
                date.setMonth(date.getMonth()+addedMonth)
                const year=date.getFullYear().toString().slice(2);
                const updatedStr = (date.getMonth()+1)+"/"+date.getDate()+"/"+year
                GNVPGroup=updatedStr;
            }
            let VOZTest=sheet["T"+j]?.["w"]??null;
            if(VOZTest && sheet["T2"]?.["w"]!=null){
                const date=new Date();
                date.setFullYear(parseInt("20"+VOZTest.split("/")[2]));
                date.setMonth(parseInt(VOZTest.split("/")[0])-1);
                date.setDate(parseInt(VOZTest.split("/")[1]))
                const addedMonth=parseInt(sheet["T2"]?.["w"])
                date.setMonth(date.getMonth()+addedMonth)
                const year=date.getFullYear().toString().slice(2);
                const updatedStr = (date.getMonth()+1)+"/"+date.getDate()+"/"+year
                VOZTest=updatedStr;
            }
            const VOZProfessional=sheet["U"+j]?.["w"]??null;

            //new->
            const burAndVSR=sheet["V"+j]?.["w"]??null;
            const KSAndCMP=sheet["W"+j]?.["w"]??null;
            const transport=sheet["X"+j]?.["w"]??null;
            const energy=sheet["Y"+j]?.["w"]??null;
            const GT=sheet["Z"+j]?.["w"]??null;
            const PPDU=sheet["AA"+j]?.["w"]??null;
            const CA=sheet["AB"+j]?.["w"]??null;
            const KP_2=sheet["AC"+j]?.["w"]??null;
            const PB_11=sheet["AD"+j]?.["w"]??null;
            const PB_12=sheet["AE"+j]?.["w"]??null;
            //end

            let lastInputDate=sheet["AK"+j]?.["w"]??null;
            let lastInputKPP=sheet["AL"+j]?.["w"]??null;
            const medicalType=sheet["AJ"+j]?.["w"]??null;
            let passDate=sheet["AM"+j]?.["w"]??null;
            if(passDate){
                const date=new Date();
                date.setFullYear(parseInt("20"+passDate.split("/")[2]));
                date.setMonth(parseInt(passDate.split("/")[0])-1);
                date.setDate(parseInt(passDate.split("/")[1]))
                const addedMonth=0
                date.setMonth(date.getMonth()+addedMonth)
                const year=date.getFullYear().toString().slice(2);
                const updatedStr = (date.getMonth()+1)+"/"+date.getDate()+"/"+year
                passDate=updatedStr;
            }
            const passStatus=sheet["AN"+j]?.["w"]??null;
            const info =new FullInfo()
            info.fullName=fullName;
            info.propuskNumber=propuskNumber;
            info.organization=organization;
            info.professionals=professionals;
            info.medical=medical;
            info.promSecure=promSecure;
            info.infoSecure=infoSecure;
            info.workSecure=workSecure;
            info.medicalHelp=medicalHelp;
            info.fireSecure=fireSecure;
            info.winterDriver=winterDriver;
            info.workInHeight=workInHeight;
            info.workInHeightGroup=workInHeightGroup;
            info.GPVPGroup=GPVPGroup;
            info.GNVPGroup=GNVPGroup;
            info.VOZTest=VOZTest;
            info.VOZProfessional=VOZProfessional;
            info.promSecureOblast=promSecureOblast;
            info.electroSecureGroup=electroSecureGroup;
            info.electroSecure=electroSecure;
            info.driverPermit=driverPermit;
            info.burAndVSR=burAndVSR;
            info.KSAndCMP=KSAndCMP;
            info.transport=transport;
            info.energy=energy;
            info.GT=GT;
            info.PPDU=PPDU;
            info.CA=CA;
            info.KP_2=KP_2;
            info.PB_11=PB_11;
            info.PB_12=PB_12;
            info.medicalType=medicalType;
            info.lastInputDate=lastInputDate;
            info.lastInputKPP=lastInputKPP;
            info.passStatus=passStatus;
            info.passDate=passDate;
           
            const value= fullInfoList.filter(element=>element.propuskNumber==propuskNumber)
            if(value.length>0){
                lastInputDate=value[0].lastInputDate
                lastInputKPP=value[0].lastInputKPP
            }
            
            
            await FullInfo.create({
                [FullInfoRow.fullName]:fullName,
                [FullInfoRow.propuskNumber]:propuskNumber,
                [FullInfoRow.organization]:organization,
                [FullInfoRow.professionals]:professionals,
                [FullInfoRow.medical]:medical,
                [FullInfoRow.promSecure]:promSecure,
                [FullInfoRow.infoSecure]:infoSecure,
                [FullInfoRow.workSecure]:workSecure,
                [FullInfoRow.medicalHelp]:medicalHelp,
                [FullInfoRow.fireSecure]:fireSecure,
                [FullInfoRow.winterDriver]:winterDriver,
                [FullInfoRow.workInHeight]:workInHeight,
                [FullInfoRow.workInHeightGroup]:workInHeightGroup,
                [FullInfoRow.GPVPGroup]:GPVPGroup,
                [FullInfoRow.GNVPGroup]:GNVPGroup,
                [FullInfoRow.VOZTest]:VOZTest,
                [FullInfoRow.VOZProfessional]:VOZProfessional,
                [FullInfoRow.promSecureOblast]:promSecureOblast,
                [FullInfoRow.electroSecureGroup]:electroSecureGroup,
                [FullInfoRow.electroSecure]:electroSecure,
                [FullInfoRow.driverPermit]:driverPermit,
                [FullInfoRow.burAndVSR]:burAndVSR,
                [FullInfoRow.KSAndCMP]:KSAndCMP,
                [FullInfoRow.transport]:transport,
                [FullInfoRow.energy]:energy,
                [FullInfoRow.GT]:GT,
                [FullInfoRow.PPDU]:PPDU,
                [FullInfoRow.CA]:CA,
                [FullInfoRow.KP_2]:KP_2,
                [FullInfoRow.PB_11]:PB_11,
                [FullInfoRow.PB_12]:PB_12,
                [FullInfoRow.medicalType]:medicalType,
                [FullInfoRow.lastInputDate]:lastInputDate,
                [FullInfoRow.lastInputKPP]:lastInputKPP,
                [FullInfoRow.passStatus]:passStatus,
                [FullInfoRow.passDate]:passDate,
            },{transaction})
            console.log("Запись создана");
            if(value.length>0){
                console.log("Запись обновлена");
            }
        }
        await transaction.commit()
       } catch (error) {
        transaction.rollback()
        console.log(error);
        
       } finally{
            await Settings.update({
                [SettingsRow.value]:0,
            },{
                where:{
                    [SettingsRow.name]:"update",
                }
            })
       }
    }


    async createJurnalAndDb(){

        //jurnal
        const jurnal=await Jurnal.findAll({order:[['id', 'DESC']]})
        
        const jurnalName="jurnal "+Date.now()+".xlsx";
        const files = fs.readdirSync(__dirname);
        console.log(files);
        const filess = fs.readdirSync(__dirname+"/../temp");
        console.log(filess);
        fs.copyFileSync(__dirname+"/../temp/jurnal_example.xlsx",__dirname+"/../temp/"+jurnalName);
        const workbookJurnal=await XlsxPopulate.fromFileAsync(__dirname+"/../temp/"+jurnalName)
        jurnal.forEach((element,index)=>{
            workbookJurnal.sheet("Лист1").cell(`A${index+2}`).value(element.kpp);
            workbookJurnal.sheet("Лист1").cell(`B${index+2}`).value(element.deviceId);
            workbookJurnal.sheet("Лист1").cell(`C${index+2}`).value(element.date);
            workbookJurnal.sheet("Лист1").cell(`D${index+2}`).value(element.time);
            workbookJurnal.sheet("Лист1").cell(`E${index+2}`).value(element.numberPassTS);
            workbookJurnal.sheet("Лист1").cell(`F${index+2}`).value(element.numberPassDriver);
            workbookJurnal.sheet("Лист1").cell(`G${index+2}`).value(element.numberPassPassanger);
            workbookJurnal.sheet("Лист1").cell(`H${index+2}`).value(element.ttn);
            workbookJurnal.sheet("Лист1").cell(`I${index+2}`).value(element.inputObject);
            workbookJurnal.sheet("Лист1").cell(`J${index+2}`).value(element.outputObject);
            workbookJurnal.sheet("Лист1").cell(`K${index+2}`).value(element.errors);
            
         })
        
        
        // Write to file.
             await workbookJurnal.toFileAsync(__dirname+"/../temp/"+jurnalName);
             await sendMail(__dirname+"/../temp/"+jurnalName,jurnalName);
             
             return;
            const db= await FullInfo.findAll({order: [['id', 'DESC']]});
            const dbName="Base "+Date.now()+".xlsx";
            fs.copyFileSync(__dirname+"/../temp/db_example.xlsx",__dirname+"/../temp/"+dbName);
            const workbook= await  XlsxPopulate.fromFileAsync(__dirname+"/../temp/"+dbName)
            db.forEach((element,index)=>{
                const document= element
                workbook.sheet("Лист1").cell(`A${index+3}`).value(element.fullName);
                workbook.sheet("Лист1").cell(`B${index+3}`).value(element.propuskNumber);
                workbook.sheet("Лист1").cell(`C${index+3}`).value(element.organization);
                workbook.sheet("Лист1").cell(`D${index+3}`).value(element.professionals);
                let medicalDate= element.medical;
                let medicalDate_formatted;
                if(medicalDate&&element.medicalType){
                    let parts = medicalDate.split("/");
                    const lastNum = parseInt(parts[parts.length - 1]);
                    const addedYear=parseInt(element.medicalType)
                    const sum =lastNum-addedYear;
                    //const updatedStr = parts.slice(0, parts.length - 1).join("/") + "/" + sum;
                    const updatedStr=parts[0]+'.'+parts[1]+"."+sum;
                    medicalDate_formatted=new Date(parseInt("20"+sum.toString()), parseInt(parts[0])-1, parseInt(parts[1]))
                    //console.log(medicalDate_formatted);
                    
                }
                workbook.sheet("Лист1").cell(`E${index+3}`).value(medicalDate_formatted)//.style("numberFormat", "dd.mm.yyyy");
                let promSecure= element.promSecure;
                const promSecureDuration=workbook.sheet("Лист1").cell(`F2`).value();
                let promSecure_formatted;
                if(promSecure && promSecureDuration){
                    const date=new Date();
                    date.setFullYear(parseInt("20"+promSecure.split("/")[2]));
                    date.setMonth(parseInt(promSecure.split("/")[0])-1);
                    date.setDate(parseInt(promSecure.split("/")[1]))
                    
                    
                    const addedMonth=parseInt(promSecureDuration)
                    date.setMonth(date.getMonth()-addedMonth)
                    
                    
                    const year=date.getFullYear().toString().slice(2);
                    const updatedStr = (date.getMonth()+1)+"/"+date.getDate()+"/"+(date.getMonth()==0?(parseInt(year)-1):year)
                    promSecure=updatedStr;
                    promSecure_formatted=date;
                }
                workbook.sheet("Лист1").cell(`F${index+3}`).value(promSecure_formatted)//.style("numberFormat", "dd.mm.yyyy");
                workbook.sheet("Лист1").cell(`G${index+3}`).value(element.promSecureOblast);

                let infoSecure= element.infoSecure;
                const infoSecureDuration=workbook.sheet("Лист1").cell(`H2`).value();
                let infoSecure_formatted;
                if(infoSecure && infoSecureDuration){
                    const date=new Date();
                    date.setFullYear(parseInt("20"+infoSecure.split("/")[2]));
                    date.setMonth(parseInt(infoSecure.split("/")[0])-1);
                    date.setDate(parseInt(infoSecure.split("/")[1]))

                    const addedMonth=parseInt(infoSecureDuration)
                    date.setMonth(date.getMonth()-addedMonth)
                    const year=date.getFullYear().toString().slice(2);
                    const updatedStr = (date.getMonth()==0?"12":date.getMonth())+"/"+date.getDate()+"/"+(date.getMonth()==0?(parseInt(year)-1):year)
                    infoSecure_formatted=date;
                }
                workbook.sheet("Лист1").cell(`H${index+3}`).value(infoSecure_formatted)//.style("numberFormat", "dd.mm.yyyy");
                let workSecure= element.workSecure;
                const workSecureDuration=workbook.sheet("Лист1").cell(`I2`).value();
                let workSecure_formatted;
                if(workSecure && workSecureDuration){
                    const date=new Date();
                    date.setFullYear(parseInt("20"+workSecure.split("/")[2]));
                    date.setMonth(parseInt(workSecure.split("/")[0])-1);
                    date.setDate(parseInt(workSecure.split("/")[1]))

                    const addedMonth=parseInt(workSecureDuration)
                    date.setMonth(date.getMonth()-addedMonth)
                    const year=date.getFullYear().toString().slice(2);
                    const updatedStr = (date.getMonth()==0?"12":date.getMonth())+"/"+date.getDate()+"/"+(date.getMonth()==0?(parseInt(year)-1):year)
                    workSecure=updatedStr;
                    workSecure_formatted=date;
                }
                workbook.sheet("Лист1").cell(`I${index+3}`).value(workSecure_formatted)//.style("numberFormat", "dd.mm.yyyy");
                let medicalHelp= element.medicalHelp;
                const medicalHelpDuration=workbook.sheet("Лист1").cell(`J2`).value();
                let medicalHelp_formatted;
                if(medicalHelp && medicalHelpDuration){
                    const date=new Date();
                    date.setFullYear(parseInt("20"+medicalHelp.split("/")[2]));
                    date.setMonth(parseInt(medicalHelp.split("/")[0])-1);
                    date.setDate(parseInt(medicalHelp.split("/")[1]))

                    const addedMonth=parseInt(medicalHelpDuration)
                    date.setMonth(date.getMonth()-addedMonth)
                    const year=date.getFullYear().toString().slice(2);
                    const updatedStr = (date.getMonth()==0?"12":date.getMonth())+"/"+date.getDate()+"/"+(date.getMonth()==0?(parseInt(year)-1):year)
                    medicalHelp=updatedStr;
                    medicalHelp_formatted=date;
                }
                workbook.sheet("Лист1").cell(`J${index+3}`).value(medicalHelp_formatted)//.style("numberFormat", "dd.mm.yyyy");
                let fireSecure= element.fireSecure;
                const fireSecureDuration=workbook.sheet("Лист1").cell(`K2`).value();
                let fireSecure_formatted;
                if(fireSecure && fireSecureDuration){
                    const date=new Date();
                    date.setFullYear(parseInt("20"+fireSecure.split("/")[2]));
                    date.setMonth(parseInt(fireSecure.split("/")[0])-1);
                    date.setDate(parseInt(fireSecure.split("/")[1]))

                    const addedMonth=parseInt(fireSecureDuration)
                    date.setMonth(date.getMonth()-addedMonth)
                    const year=date.getFullYear().toString().slice(2);
                    const updatedStr = (date.getMonth()==0?"12":date.getMonth())+"/"+date.getDate()+"/"+(date.getMonth()==0?(parseInt(year)-1):year)
                    fireSecure=updatedStr;
                    fireSecure_formatted=date;
                }
                workbook.sheet("Лист1").cell(`K${index+3}`).value(fireSecure_formatted)//.style("numberFormat", "dd.mm.yyyy");
                let electroSecure= element.electroSecure;
                const electroSecureDuration=workbook.sheet("Лист1").cell(`L2`).value();
                let electroSecure_formatted;
                if(electroSecure && electroSecureDuration){
                    const date=new Date();
                    date.setFullYear(parseInt("20"+electroSecure.split("/")[2]));
                    date.setMonth(parseInt(electroSecure.split("/")[0])-1);
                    date.setDate(parseInt(electroSecure.split("/")[1]))

                    const addedMonth=parseInt(electroSecureDuration)
                    date.setMonth(date.getMonth()-addedMonth)
                    const year=date.getFullYear().toString().slice(2);
                    const updatedStr = (date.getMonth()==0?"12":date.getMonth())+"/"+date.getDate()+"/"+(date.getMonth()==0?(parseInt(year)-1):year)
                    electroSecure=updatedStr;
                    electroSecure_formatted=date;
                }
                
                workbook.sheet("Лист1").cell(`L${index+3}`).value(electroSecure_formatted)//.style("numberFormat", "dd.mm.yyyy");
                workbook.sheet("Лист1").cell(`M${index+3}`).value(element.electroSecureGroup);
                workbook.sheet("Лист1").cell(`N${index+3}`).value(element.driverPermit);
                let winterDriver= element.winterDriver;
                let winterDriver_formatted;
                if(winterDriver){
                    const date=new Date();
                    date.setFullYear(parseInt("20"+winterDriver.split("/")[2]));
                    date.setMonth(parseInt(winterDriver.split("/")[0])-1);
                    date.setDate(parseInt(winterDriver.split("/")[1]))

                    const addedMonth=0
                    date.setMonth(date.getMonth()-addedMonth)
                    const year=date.getFullYear().toString().slice(2);
                    const updatedStr = (date.getMonth()==0?"12":date.getMonth())+"/"+date.getDate()+"/"+(date.getMonth()==0?(parseInt(year)-1):year)
                    electroSecure=updatedStr;
                    winterDriver_formatted=date;
                }
                workbook.sheet("Лист1").cell(`O${index+3}`).value(winterDriver_formatted)//.style("numberFormat", "dd.mm.yyyy");
                let workInHeight= element.workInHeight;
                const workInHeightDuration=workbook.sheet("Лист1").cell(`P2`).value();
                let workInHeight_formatted;
                if(workInHeight && electroSecureDuration){
                    const date=new Date();
                    date.setFullYear(parseInt("20"+workInHeight.split("/")[2]));
                    date.setMonth(parseInt(workInHeight.split("/")[0])-1);
                    date.setDate(parseInt(workInHeight.split("/")[1]))

                    const addedMonth=parseInt(workInHeightDuration)
                    date.setMonth(date.getMonth()-addedMonth)
                    const year=date.getFullYear().toString().slice(2);
                    const updatedStr = (date.getMonth()==0?"12":date.getMonth())+"/"+date.getDate()+"/"+(date.getMonth()==0?(parseInt(year)-1):year)
                    workInHeight=updatedStr;
                    workInHeight_formatted=date;
                }
                workbook.sheet("Лист1").cell(`P${index+3}`).value(workInHeight_formatted)//.style("numberFormat", "dd.mm.yyyy");
                workbook.sheet("Лист1").cell(`Q${index+3}`).value(element.workInHeightGroup);
                let GPVPGroup= element.GPVPGroup;
                const GPVPGroupDuration=workbook.sheet("Лист1").cell(`R2`).value();
                let GPVPGroup_formatted;
                if(GPVPGroup && GPVPGroupDuration){
                    const date=new Date();
                    date.setFullYear(parseInt("20"+GPVPGroup.split("/")[2]));
                    date.setMonth(parseInt(GPVPGroup.split("/")[0])-1);
                    date.setDate(parseInt(GPVPGroup.split("/")[1]))

                    const addedMonth=parseInt(GPVPGroupDuration)
                    date.setMonth(date.getMonth()-addedMonth)
                    const year=date.getFullYear().toString().slice(2);
                    const updatedStr = (date.getMonth()==0?"12":date.getMonth())+"/"+date.getDate()+"/"+(date.getMonth()==0?(parseInt(year)-1):year)
                    GPVPGroup=updatedStr;
                    GPVPGroup_formatted=date;
                }
                workbook.sheet("Лист1").cell(`R${index+3}`).value(GPVPGroup_formatted)//.style("numberFormat", "dd.mm.yyyy");
                let GNVPGroup= element.GNVPGroup;
                const GNVPGroupDuration=workbook.sheet("Лист1").cell(`S2`).value();
                let GNVPGroup_formatted;
                if(GNVPGroup && GNVPGroupDuration){
                    const date=new Date();
                    date.setFullYear(parseInt("20"+GNVPGroup.split("/")[2]));
                    date.setMonth(parseInt(GNVPGroup.split("/")[0])-1);
                    date.setDate(parseInt(GNVPGroup.split("/")[1]))

                    const addedMonth=parseInt(GNVPGroupDuration)
                    date.setMonth(date.getMonth()-addedMonth)
                    const year=date.getFullYear().toString().slice(2);
                    const updatedStr = (date.getMonth()==0?"12":date.getMonth())+"/"+date.getDate()+"/"+(date.getMonth()==0?(parseInt(year)-1):year)
                    GNVPGroup=updatedStr;
                    GNVPGroup_formatted=date;
                }
                workbook.sheet("Лист1").cell(`S${index+3}`).value(GNVPGroup_formatted)//.style("numberFormat", "dd.mm.yyyy");
                let VOZTest= element.VOZTest;
                const VOZTestDuration=workbook.sheet("Лист1").cell(`T2`).value();
                let VOZTest_formatted;
                if(VOZTest && VOZTestDuration){
                    const date=new Date();
                    date.setFullYear(parseInt("20"+VOZTest.split("/")[2]));
                    date.setMonth(parseInt(VOZTest.split("/")[0])-1);
                    date.setDate(parseInt(VOZTest.split("/")[1]))

                    const addedMonth=parseInt(VOZTestDuration)
                    date.setMonth(date.getMonth()-addedMonth)
                    const year=date.getFullYear().toString().slice(2);
                    const updatedStr = (date.getMonth()==0?"12":date.getMonth())+"/"+date.getDate()+"/"+(date.getMonth()==0?(parseInt(year)-1):year)
                    VOZTest=updatedStr;
                    VOZTest_formatted=date;
                }
                workbook.sheet("Лист1").cell(`T${index+3}`).value(VOZTest_formatted)//.style("numberFormat", "dd.mm.yyyy");
                workbook.sheet("Лист1").cell(`U${index+3}`).value(element.VOZProfessional);
                workbook.sheet("Лист1").cell(`V${index+3}`).value(element.burAndVSR);
                workbook.sheet("Лист1").cell(`W${index+3}`).value(element.KSAndCMP);
                workbook.sheet("Лист1").cell(`X${index+3}`).value(element.transport);
                workbook.sheet("Лист1").cell(`Y${index+3}`).value(element.energy);
                workbook.sheet("Лист1").cell(`Z${index+3}`).value(element.GT);
                workbook.sheet("Лист1").cell(`AA${index+3}`).value(element.PPDU);
                workbook.sheet("Лист1").cell(`AB${index+3}`).value(element.CA);
                workbook.sheet("Лист1").cell(`AC${index+3}`).value(element.KP_2);
                workbook.sheet("Лист1").cell(`AD${index+3}`).value(element.PB_11);
                workbook.sheet("Лист1").cell(`AE${index+3}`).value(element.PB_12);
                workbook.sheet("Лист1").cell(`AJ${index+3}`).value(element.medicalType);
                workbook.sheet("Лист1").cell(`AK${index+3}`).value(element.lastInputDate);
                workbook.sheet("Лист1").cell(`AL${index+3}`).value(element.lastInputKPP);
                let passDate= element.passDate;
                let passDate_formatted;
                if(passDate){
                    const date=new Date();
                    date.setFullYear(parseInt("20"+passDate.split("/")[2]));
                    date.setMonth(parseInt(passDate.split("/")[0])-1);
                    date.setDate(parseInt(passDate.split("/")[1]))

                    const addedMonth=0
                    date.setMonth(date.getMonth()-addedMonth)
                    const year=date.getFullYear().toString().slice(2);
                    const updatedStr = (date.getMonth()==0?"12":date.getMonth())+"/"+date.getDate()+"/"+(date.getMonth()==0?(parseInt(year)-1):year)
                    VOZTest=updatedStr;
                    passDate_formatted=date;
                }
                workbook.sheet("Лист1").cell(`AM${index+3}`).value(passDate_formatted)//.style("numberFormat", "dd.mm.yyyy");
                workbook.sheet("Лист1").cell(`AN${index+3}`).value(element.passStatus);
             })
            await workbook.toFileAsync(__dirname+"/../temp/"+dbName);    
            //await sendMail(__dirname+"/../temp/"+jurnalName,jurnalName,__dirname+"/../temp/"+dbName,dbName);

    }
    
}

export default new ExcelTOOL();