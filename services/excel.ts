import xlsx = require('xlsx');
import path = require('path');
import WorkInfo from '../models/workInfo';
import fs = require('fs');
import FullInfo, { FullInfoRow } from '../models/full_info';
import Settings, { SettingsRow } from '../models/settings';
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
        } else {
        console.log('No number found');
        }
        for(let j=3;j<=endRow;j++){
        
            const fullName=sheet["A"+j]?.["w"]??null;
            const propuskNumber=sheet["B"+j]?.["w"]??null;
            const organization=sheet["C"+j]?.["w"]??null;
            const professionals=sheet["D"+j]?.["w"]??null;
            //

            const medical=sheet["E"+j]?.["w"]??null;
            const promSecure=sheet["F"+j]?.["w"]??null;
            const promSecureOblast=sheet["G"+j]?.["w"]??null; //new
            const infoSecure=sheet["H"+j]?.["w"]??null;
            const workSecure=sheet["I"+j]?.["w"]??null;
            const medicalHelp=sheet["J"+j]?.["w"]??null;
            const fireSecure=sheet["K"+j]?.["w"]??null;
            const electroSecureGroup=sheet["L"+j]?.["w"]??null;//new
            const electroSecure=sheet["M"+j]?.["w"]??null;//new
            const driverPermit=sheet["N"+j]?.["w"]??null;//new
            const winterDriver=sheet["O"+j]?.["w"]??null;
            const workInHeight=sheet["P"+j]?.["w"]??null;
            const workInHeightGroup=sheet["Q"+j]?.["w"]??null;
            const GPVPGroup=sheet["R"+j]?.["w"]??null;
            const GNVPGroup=sheet["S"+j]?.["w"]??null;
            const VOZTest=sheet["T"+j]?.["w"]??null;
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
    
}

export default new ExcelTOOL();