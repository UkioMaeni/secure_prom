import xlsx = require('xlsx');
import path = require('path');
import FullInfo,{FullInfoRow} from "../models/full_info"
import Auth, { AuthRow } from '../models/auth';
const alpabet:Array<string>=['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','AF','AG','AH','AI']


 



export async function initialize(){
    await Auth.sync();
    await Auth.create({
        [AuthRow.passHash]:"65e84be33532fb784c48129675f9eff3a682b27168c0ea744b2cf58ee02337c5"
    });
    await FullInfo.sync();
    const workBook= xlsx.readFile(path.join(__dirname, '../init_db_data.xlsb'))
    const sheet = workBook.Sheets['УРПО'];
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
            console.log(sheet["F3"]);
            
            const fullName=sheet["B"+j]?.["w"]??null;
            const propuskNumber=sheet["C"+j]?.["w"]??null;
            const organization=sheet["D"+j]?.["w"]??null;
            const mainProfessional=sheet["E"+j]?.["w"]??null;
            const secondProfessional=sheet["F"+j]?.["w"]??null;
            const firdProfessional=sheet["G"+j]?.["w"]??null;
            const otherProfessional=sheet["H"+j]?.["w"]??null;
            const medical=sheet["I"+j]?.["w"]??null;
            const promSecure=sheet["J"+j]?.["w"]??null;
            const infoSecure=sheet["K"+j]?.["w"]??null;
            const workSecure=sheet["L"+j]?.["w"]??null;
            const medicalHelp=sheet["M"+j]?.["w"]??null;
            const fireSecure=sheet["N"+j]?.["w"]??null;
            const groupEB=sheet["O"+j]?.["w"]??null;
            const winterDriver=sheet["P"+j]?.["w"]??null;
            const workInHeight=sheet["Q"+j]?.["w"]??null;
            const GPVPGroup=sheet["R"+j]?.["w"]??null;
            const GNVPGroup=sheet["S"+j]?.["w"]??null;
            const VOZTest=sheet["T"+j]?.["w"]??null;
            const VOZProfessional=sheet["U"+j]?.["w"]??null;
            const lastInputDate=sheet["AF"+j]?.["w"]??null;
            const lastInputKPP=sheet["AG"+j]?.["w"]??null;
            const passStatus=sheet["AH"+j]?.["w"]??null;
            const passDate=sheet["AI"+j]?.["w"]??null;

            await FullInfo.create({
                [FullInfoRow.fullName]:fullName,
                [FullInfoRow.propuskNumber]:propuskNumber,
                [FullInfoRow.organization]:organization,
                [FullInfoRow.mainProfessional]:mainProfessional,
                [FullInfoRow.secondProfessional]:secondProfessional,
                [FullInfoRow.firdProfessional]:firdProfessional,
                [FullInfoRow.otherProfessional]:otherProfessional,
                [FullInfoRow.medical]:medical,
                [FullInfoRow.promSecure]:promSecure,
                [FullInfoRow.infoSecure]:infoSecure,
                [FullInfoRow.workSecure]:workSecure,
                [FullInfoRow.medicalHelp]:medicalHelp,
                [FullInfoRow.fireSecure]:fireSecure,
                [FullInfoRow.groupEB]:groupEB,
                [FullInfoRow.winterDriver]:winterDriver,
                [FullInfoRow.workInHeight]:workInHeight,
                [FullInfoRow.GPVPGroup]:GPVPGroup,
                [FullInfoRow.GNVPGroup]:GNVPGroup,
                [FullInfoRow.VOZTest]:VOZTest,
                [FullInfoRow.VOZProfessional]:VOZProfessional,
                [FullInfoRow.lastInputDate]:lastInputDate,
                [FullInfoRow.lastInputKPP]:lastInputKPP,
                [FullInfoRow.passStatus]:passStatus,
                [FullInfoRow.passDate]:passDate,
            })
        } 
}