import xlsx = require('xlsx');
import path = require('path');
import WorkInfo from '../models/workInfo';
import fs = require('fs');
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

    
}

export default new ExcelTOOL();