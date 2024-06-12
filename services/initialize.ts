import xlsx = require('xlsx');
import path = require('path');
import FullInfo,{FullInfoRow} from "../models/full_info"
import Auth, { AuthRow } from '../models/auth';
import WhiteEmailList,{WhiteEmailListRow} from '../models/whiteEmailList';
import AdminAuth,{AdminAuthRow} from '../models/adminAuth';
import Settings, { SettingsRow } from '../models/settings';


 



export async function initialize(){
    await Settings.sync()
    await Settings.findOrCreate({
        where:{
            [SettingsRow.name]:'lastMail'
        },
        defaults:{
            [SettingsRow.name]:'lastMail',
            [SettingsRow.value]:11069
        }
    })
    await Settings.findOrCreate({
        where:{
            [SettingsRow.name]:'update'
        },
        defaults:{
            [SettingsRow.name]:'update',
            [SettingsRow.value]:1
        }
    })
    await WhiteEmailList.sync();
    await WhiteEmailList.findOrCreate({
        where:{
            [WhiteEmailListRow.email]:'priz.a47@gmail.com'
        },defaults:{
            [WhiteEmailListRow.email]:'priz.a47@gmail.com'
        }
    })
    await Auth.sync();
    await AdminAuth.sync()
    await AdminAuth.findOrCreate({
        where:{
            [AdminAuthRow.login]:"root"
        },
        defaults:{
            [AdminAuthRow.login]:"root",
            [AdminAuthRow.pass_hash]:"4813494d137e1631bba301d5acab6e7bb7aa74ce1185d456565ef51d737677b2"
        }
        
    });
    await Auth.findOrCreate({
        where:{
            [AuthRow.pass_hash]:"65e84be33532fb784c48129675f9eff3a682b27168c0ea744b2cf58ee02337c5"
        },
        defaults:{
            [AuthRow.pass_hash]:"65e84be33532fb784c48129675f9eff3a682b27168c0ea744b2cf58ee02337c5"
        }
        
    });
    await FullInfo.sync();
    return
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