import xlsx = require('xlsx');
import path = require('path');
import WorkInfo from '../models/workInfo';
import fs = require('fs');
import FullInfo, { FullInfoRow } from '../models/full_info';
import Settings, { SettingsRow } from '../models/settings';
import Jurnal from '../models/jurnal';
import { sendMail } from './mailer';
const XlsxPopulate = require('xlsx-populate');
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
       try {
        const setting=  await Settings.findOne({
            where:{
                [SettingsRow.name]:"update"
            }
        });
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
        
    const workBook= xlsx.readFile(path.join(__dirname+"/../temp/"+pathToFile))
    
    
    const sheet = workBook.Sheets['Лист1'];
    const dataCount=sheet["!ref"].split(":");
    const regex = /\d+/;
    const match = dataCount[1].match(regex);
    await FullInfo.truncate();
    let endRow:number=0;
    if (match) {
        const number = parseInt(match[0]);
        console.log(number); 
        endRow=number;
        console.log(endRow);
        
        } else {
        console.log('No number found');
        }
        for(let j=3;j<=endRow;j++){
        
            const fullName=sheet["A"+j]?.["w"]??null;
            const propuskNumber=sheet["B"+j]?.["w"]??null;
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
                const date = new Date(parseInt("20"+promSecure.split("/")[2]), parseInt(promSecure.split("/")[0]), parseInt(promSecure.split("/")[1]));
                const addedMonth=parseInt(sheet["F2"]?.["w"])
                date.setMonth(date.getMonth()+addedMonth)
                const year=date.getFullYear().toString().slice(2);
                const updatedStr = (date.getMonth()==0?"12":date.getMonth())+"/"+date.getDate()+"/"+year
                promSecure=updatedStr;
                
                
            }

            const promSecureOblast=sheet["G"+j]?.["w"]??null; //new
            let infoSecure=sheet["H"+j]?.["w"]??null;
            if(infoSecure && sheet["H2"]?.["w"]!=null){
                const date = new Date(parseInt("20"+infoSecure.split("/")[2]), parseInt(infoSecure.split("/")[0]), parseInt(infoSecure.split("/")[1]));
                const addedMonth=parseInt(sheet["H2"]?.["w"])
                date.setMonth(date.getMonth()+addedMonth)
                const year=date.getFullYear().toString().slice(2);
                const updatedStr = (date.getMonth()==0?"12":date.getMonth())+"/"+date.getDate()+"/"+year
                infoSecure=updatedStr;
            }
            let workSecure=sheet["I"+j]?.["w"]??null;//---
            if(workSecure && sheet["I2"]?.["w"]!=null){
                const date = new Date(parseInt("20"+workSecure.split("/")[2]), parseInt(workSecure.split("/")[0]), parseInt(workSecure.split("/")[1]));
                const addedMonth=parseInt(sheet["I2"]?.["w"])
                date.setMonth(date.getMonth()+addedMonth)
                const year=date.getFullYear().toString().slice(2);
                const updatedStr = (date.getMonth()==0?"12":date.getMonth())+"/"+date.getDate()+"/"+year
                workSecure=updatedStr;
            }
            let medicalHelp=sheet["J"+j]?.["w"]??null;
            if(medicalHelp && sheet["J2"]?.["w"]!=null){
                const date = new Date(parseInt("20"+medicalHelp.split("/")[2]), parseInt(medicalHelp.split("/")[0]), parseInt(medicalHelp.split("/")[1]));
                const addedMonth=parseInt(sheet["J2"]?.["w"])
                date.setMonth(date.getMonth()+addedMonth)
                const year=date.getFullYear().toString().slice(2);
                const updatedStr = (date.getMonth()==0?"12":date.getMonth())+"/"+date.getDate()+"/"+year
                medicalHelp=updatedStr;
            }
            let fireSecure=sheet["K"+j]?.["w"]??null;
            if(fireSecure && sheet["K2"]?.["w"]!=null){
                const date = new Date(parseInt("20"+fireSecure.split("/")[2]), parseInt(fireSecure.split("/")[0]), parseInt(fireSecure.split("/")[1]));
                const addedMonth=parseInt(sheet["K2"]?.["w"])
                date.setMonth(date.getMonth()+addedMonth)
                const year=date.getFullYear().toString().slice(2);
                const updatedStr = (date.getMonth()==0?"12":date.getMonth())+"/"+date.getDate()+"/"+year
                fireSecure=updatedStr;
            }
            
            let electroSecure=sheet["L"+j]?.["w"]??null;//new
            if(electroSecure && sheet["L2"]?.["w"]!=null){
                const date = new Date(parseInt("20"+electroSecure.split("/")[2]), parseInt(electroSecure.split("/")[0]), parseInt(electroSecure.split("/")[1]));
                const addedMonth=parseInt(sheet["L2"]?.["w"])
                date.setMonth(date.getMonth()+addedMonth)
                const year=date.getFullYear().toString().slice(2);
                const updatedStr = (date.getMonth()==0?"12":date.getMonth())+"/"+date.getDate()+"/"+year
                electroSecure=updatedStr;
            }
            const electroSecureGroup=sheet["M"+j]?.["w"]??null;//new
            const driverPermit=sheet["N"+j]?.["w"]??null;//new
            const winterDriver=sheet["O"+j]?.["w"]??null;
            let workInHeight=sheet["P"+j]?.["w"]??null;
            if(workInHeight && sheet["P2"]?.["w"]!=null){
                const date = new Date(parseInt("20"+workInHeight.split("/")[2]), parseInt(workInHeight.split("/")[0]), parseInt(workInHeight.split("/")[1]));
                const addedMonth=parseInt(sheet["P2"]?.["w"])
                date.setMonth(date.getMonth()+addedMonth)
                const year=date.getFullYear().toString().slice(2);
                const updatedStr = (date.getMonth()==0?"12":date.getMonth())+"/"+date.getDate()+"/"+year
                workInHeight=updatedStr;
            }
            const workInHeightGroup=sheet["Q"+j]?.["w"]??null;
            let GPVPGroup=sheet["R"+j]?.["w"]??null;
            if(GPVPGroup && sheet["R2"]?.["w"]!=null){
                const date = new Date(parseInt("20"+GPVPGroup.split("/")[2]), parseInt(GPVPGroup.split("/")[0]), parseInt(GPVPGroup.split("/")[1]));
                const addedMonth=parseInt(sheet["R2"]?.["w"])
                date.setMonth(date.getMonth()+addedMonth)
                const year=date.getFullYear().toString().slice(2);
                const updatedStr = (date.getMonth()==0?"12":date.getMonth())+"/"+date.getDate()+"/"+year
                GPVPGroup=updatedStr;
            }
            let GNVPGroup=sheet["S"+j]?.["w"]??null;
            if(GNVPGroup && sheet["S2"]?.["w"]!=null){
                const date = new Date(parseInt("20"+GNVPGroup.split("/")[2]), parseInt(GNVPGroup.split("/")[0]), parseInt(GNVPGroup.split("/")[1]));
                const addedMonth=parseInt(sheet["S2"]?.["w"])
                date.setMonth(date.getMonth()+addedMonth)
                const year=date.getFullYear().toString().slice(2);
                const updatedStr = (date.getMonth()==0?"12":date.getMonth())+"/"+date.getDate()+"/"+year
                GNVPGroup=updatedStr;
            }
            let VOZTest=sheet["T"+j]?.["w"]??null;
            if(VOZTest && sheet["T2"]?.["w"]!=null){
                const date = new Date(parseInt("20"+VOZTest.split("/")[2]), parseInt(VOZTest.split("/")[0]), parseInt(VOZTest.split("/")[1]));
                const addedMonth=parseInt(sheet["T2"]?.["w"])
                date.setMonth(date.getMonth()+addedMonth)
                const year=date.getFullYear().toString().slice(2);
                const updatedStr = (date.getMonth()==0?"12":date.getMonth())+"/"+date.getDate()+"/"+year
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

            const lastInputDate=sheet["AK"+j]?.["w"]??null;
            const lastInputKPP=sheet["AL"+j]?.["w"]??null;
            const medicalType=sheet["AJ"+j]?.["w"]??null;
            const passDate=sheet["AM"+j]?.["w"]??null;
            const passStatus=sheet["AN"+j]?.["w"]??null;

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
            })
        } 
       } catch (error) {
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


    async createJurnal(){
        const jurnal=await Jurnal.findAll()
        console.log(jurnal);
        
        const name="Журнал "+new Date().toLocaleDateString()+".xlsx";
        fs.copyFileSync(__dirname+"/../temp/jurnal_example.xlsx",__dirname+"/../temp/"+name);
        XlsxPopulate.fromFileAsync(__dirname+"/../temp/"+name)
            .then(async(workbook )=> {
                // Modify the workbook.
                jurnal.forEach((element,index)=>{
                    workbook.sheet("Лист1").cell(`A${index+2}`).value(element.kpp);
                    workbook.sheet("Лист1").cell(`B${index+2}`).value(element.date);
                    workbook.sheet("Лист1").cell(`C${index+2}`).value(element.time);
                    workbook.sheet("Лист1").cell(`F${index+2}`).value(element.numberPassTS);
                    workbook.sheet("Лист1").cell(`H${index+2}`).value(element.numberPassDriver);
                    workbook.sheet("Лист1").cell(`J${index+2}`).value(element.numberPassPassanger);
                    workbook.sheet("Лист1").cell(`M${index+2}`).value(element.inputObject);
                    workbook.sheet("Лист1").cell(`N${index+2}`).value(element.outputObject);
                    workbook.sheet("Лист1").cell(`O${index+2}`).value(element.errors);
                 })
                
                
                // Write to file.
                await workbook.toFileAsync(__dirname+"/../temp/"+name);
                sendMail(__dirname+"/../temp/"+name,name);
            });
        // const workBook= xlsx.readFile(path.join(__dirname+"/../temp/"+name));
        // const mySheet = workBook.Sheets['Лист1'];
        
        
        
        // xlsx.utils.sheet_add_aoa(mySheet,[['2','3','4']],{origin:1,WTF:true})
        // mySheet["A2"]="ds"
        // xlsx.writeFile(workBook,__dirname+"/../temp/"+name)
        
        
    }
    
}

export default new ExcelTOOL();