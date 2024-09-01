import { Request, Response } from 'express';
import Auth,{AuthRow} from '../models/auth';
import crypto = require('crypto');
import FullInfo, { FullInfoRow } from '../models/full_info';
import Jurnal, { JurnalRow } from '../models/jurnal';
import { sendJurnalAndDb } from '../services/senderJurnalAndDb';
type ControllerFunction = (req: Request, res: Response) => void;

class UserController {

     getFullInfo:ControllerFunction=async(req, res) => {
        try {
          const info=req.body["jurnal"];
          console.log(req.body);
          
          const fullInfo=await FullInfo.findAll()
          res.send(fullInfo);
        } catch (error) { 
          console.log(error);
          res.status(500).send(error);
        }
      }
      addJurnal:ControllerFunction=async(req, res) => {
        try {
          const info=req.body["jurnal"] as Array<any>;
          const deviceId=req.body["deviceId"] as string;
          console.log(req.body);
          for(var element of info){
            console.log(element);
            
            Jurnal.create({
              [JurnalRow.kpp]:element["kpp"],
              [JurnalRow.date]:element["date"],
              [JurnalRow.time]:element["time"],
              [JurnalRow.numberPassTS]:element["numberPassTS"],
              [JurnalRow.numberPassDriver]:element["numberPassDriver"],
              [JurnalRow.numberPassPassanger]:element["numberPassPassanger"],
              [JurnalRow.inputObject]:element["inputObject"],
              [JurnalRow.outputObject]:element["outputObject"],
              [JurnalRow.errors]:element["errors"],
              [JurnalRow.ttn]:element["ttn"],
              [JurnalRow.deviceId]:deviceId,
            })
          }
          info.forEach(async(element)=>{
            await FullInfo.update(
              {
                [FullInfoRow.lastInputDate]:element['date'],
                [FullInfoRow.lastInputKPP]:element["inputObject"]=="ДА"?"Вход "+element["kpp"]:element["outputObject"]=="ДА"?"Выход "+element["kpp"]:null
              },{
                where:{
                  [FullInfoRow.propuskNumber]:element["numberPassPassanger"]
                }
              }
            )
          });
          const fullInfo=await FullInfo.findAll()
          res.send([]);
        } catch (error) { 
          console.log(error);
          res.status(500).send(error);
        }
      }
      sendMail:ControllerFunction=async(req, res) => {
        try {
          
          await sendJurnalAndDb();
          res.send("Отправлено");
        } catch (error) { 
          console.log(error);
          res.status(500).send(error);
        }
      }
  }
  
export default new UserController()
