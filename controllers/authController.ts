import { Request, Response } from 'express';
import FullInfo from '../models/full_info';
import Auth, { AuthRow } from '../models/auth';
import crypto = require('crypto');
import PbList, { PbListRow } from '../models/PbList';
type ControllerFunction = (req: Request, res: Response) => void;

class AuthController {

     auth:ControllerFunction=async(req, res) => {
        try {
          const {pass,login}= req.body;
          if(!pass||!login){
            return res.status(400).send({"code":1,message:"Пустые данные"});
          }

          const passHash= crypto.createHash('sha256').update(pass).digest('hex');
          const fullInfo=await PbList.findOne({
            where:{
              [PbListRow.passHash]:passHash,
              [PbListRow.login]:login
            }
          })
          if(!fullInfo){
            return res.status(400).send({"code":10,message:"Неверный пароль"});
          }
          return res.status(200).send({"code":0,message:"Успешно"});
          
        } catch (error) { 
          console.log(error);
          res.status(500).send(error);
        }    
      }
  }
export default new AuthController()
