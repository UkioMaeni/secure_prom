import { Request, Response } from 'express';
import FullInfo from '../models/full_info';
import Auth, { AuthRow } from '../models/auth';
import crypto = require('crypto');
import AdminAuth,{AdminAuthRow} from '../models/adminAuth';
import fs = require('fs');
import excelTool from "../services/excel"
import Settings, { SettingsRow } from '../models/settings';
type ControllerFunction = (req: Request, res: Response) => void;

class AuthController {

     auth:ControllerFunction=async(req, res) => {
        try {
          console.log(req.cookies);
          
          const {pass,login}= req.body;
          console.log(pass);
          console.log(login);
          
          if(!pass||!login){
            return res.status(400).send({"code":1,message:"Пустые данные"});
          }

          const passHash= crypto.createHash('sha256').update(pass).digest('hex');
          const fullInfo=await AdminAuth.findOne({
            where:{
              [AdminAuthRow.pass_hash]:passHash,
              [AdminAuthRow.login]:login,
            }
          })
          if(!fullInfo){
            return res.status(400).send({"code":10,message:"Неверные данные"});
          }
          return res.cookie('login', login, { httpOnly: true }).cookie('login', pass, { httpOnly: true }).status(200).send({"code":0,message:"Успешно"});
          
        } catch (error) { 
          console.log(error);
          res.status(500).send(error);
        }    
      }
      updateDb:ControllerFunction=async(req, res) => {
        try {
          const file=req.file;
          if(!file){
            res.status(400).send("Нет файла")
          }
          const isUpdate=await Settings.findOne({
            where:{
                [SettingsRow.name]:'update'
            }
        })
        if(isUpdate.value==1){
          return res.status(400).send("База обновляется, подождите")
        }
          fs.writeFileSync(__dirname+"/../temp/"+file.originalname,file.buffer);
          excelTool.syncToDB(file.originalname);
          res.send(200)
        } catch (error) {
          res.status(500).send("no worker")
        }
      }
      
  }
export default new AuthController()
