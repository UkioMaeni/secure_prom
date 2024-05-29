import { Request, Response } from 'express';
import FullInfo from '../models/full_info';
import Auth, { AuthRow } from '../models/auth';
import crypto = require('crypto');
type ControllerFunction = (req: Request, res: Response) => void;

class AuthController {

     auth:ControllerFunction=async(req, res) => {
        try {
          const {pass}= req.body;
          if(!pass){
            return res.status(400).send({"code":1,message:"Пустые данные"});
          }

          const passHash= crypto.createHash('sha256').update(pass).digest('hex');
          const fullInfo=await Auth.findOne({
            where:{
              [AuthRow.passHash]:passHash
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
