import xlsx = require('xlsx');
import path = require('path');
import FullInfo,{FullInfoRow} from "../models/full_info"
import Auth, { AuthRow } from '../models/auth';
import WhiteEmailList,{WhiteEmailListRow} from '../models/whiteEmailList';
import AdminAuth,{AdminAuthRow} from '../models/adminAuth';
import Settings, { SettingsRow } from '../models/settings';
import PbList from '../models/PbList';
import { where } from 'sequelize';
import Jurnal from '../models/jurnal';
import JurnalHistory from '../models/jurnal_history';


 



export async function initialize(){
    await Jurnal.sync()
    await JurnalHistory.sync()
    await Settings.sync()
    await Settings.findOrCreate({
        where:{
            [SettingsRow.name]:'lastMail'
        },
        defaults:{
            [SettingsRow.name]:'lastMail',
            [SettingsRow.value]:0
        }
    })
    // await Settings.update({
        
    //         [SettingsRow.name]:'lastMail',
    //         [SettingsRow.value]:0
    //     },
    //     {
    //         where:{
    //             [SettingsRow.name]:'lastMail',
                
    //         }
    //     }
    // )
    await Settings.findOrCreate({
        where:{
            [SettingsRow.name]:'update'
        },
        defaults:{
            [SettingsRow.name]:'update',
            [SettingsRow.value]:0
        }
    })
    await Settings.update(
        {
            [SettingsRow.value]:0
        },
        {
            where:{
                [SettingsRow.name]:'update'
            }
        },
       
    );
    await PbList.sync();
    await WhiteEmailList.sync();
    await WhiteEmailList.findOrCreate({
        where:{
            
        },defaults:{
            [WhiteEmailListRow.email]:'priz.a47@gmail.com'
        }
    })
    await Auth.sync({alter:true,});
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
    await FullInfo.sync({alter:true});
    return;
}