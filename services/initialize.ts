import xlsx = require('xlsx');
import path = require('path');

const alpabet:Array<string>=['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','AF','AG','AH','AI']


 



export function initialize(){
    const workBook= xlsx.readFile(path.join(__dirname, '../init_db_data.xlsb'))
    const sheet = workBook.Sheets['УРПО'];
    console.log(sheet["!ref"]);
    const dataCount=sheet["!ref"].split(":");
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
        for(let j=3;j<=endRow;j++){
            const fullName=sheet["B"+j];
            const propuskNumber=sheet["C"+j];
            const organization=sheet["D"+j];
            const mainProfessional=sheet["E"+j];
            const secondProfessional=sheet["F"+j];
            const firdProfessional=sheet["G"+j];
            const otherProfessional=sheet["H"+j];
            const medical=sheet["I"+j];
            const promSecure=sheet["J"+j];
            const infoSecure=sheet["K"+j];
            const workSecure=sheet["L"+j];
            const medicalHelp=sheet["M"+j];
            const fireSecure=sheet["N"+j];
            const groupEB=sheet["O"+j];
            const winterDriver=sheet["P"+j];
            const workInHeight=sheet["Q"+j];
            const GPVPGroup=sheet["R"+j];
            const GNVPGroup=sheet["S"+j];
            const VOZTest=sheet["T"+j];
            const VOZProfessional=sheet["U"+j];
            const lastInputDate=sheet["AF"+j];
            const lastInputKPP=sheet["AG"+j];
            const passStatus=sheet["AH"+j];
            const passDate=sheet["AI"+j];
        }
    
    console.log(sheet["B3"]);
    
}