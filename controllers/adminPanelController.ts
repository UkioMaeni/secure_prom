import { Request, Response } from 'express';
import FullInfo from '../models/full_info';
import Auth, { AuthRow } from '../models/auth';
import crypto = require('crypto');
import AdminAuth,{AdminAuthRow} from '../models/adminAuth';
import fs = require('fs');
import excelTool from "../services/excel"
import Settings, { SettingsRow } from '../models/settings';
import WhiteEmailList, { WhiteEmailListRow } from '../models/whiteEmailList';
import PbList, { PbListRow } from '../models/PbList';
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
          await excelTool.syncToDB(file.originalname);
          res.send(200)
        } catch (error) {
          res.status(500).send("no worker")
        }
      }
      dblist:ControllerFunction=async(req, res) => {
        try {
          
          const count=await FullInfo.count()
          console.log("count"+count);
          
          res.status(200).send(count.toString())
        } catch (error) {
          console.log(error);
          
          res.status(500).send("no worker")
        }
      }
      adminList:ControllerFunction=async(req, res) => {
        try {
          
          const adm=await AdminAuth.findAll()
          
          
          res.status(200).send(adm.map(el=>({login:el.login,id:el.id})))
        } catch (error) {
          console.log(error);
          
          res.status(500).send("no worker")
        }
      }
      adminListDelete:ControllerFunction=async(req, res) => {
        try {
          const id=req.body["id"];
          if(!id){
            res.status(400).send("error")
          }
          const count=await AdminAuth.count();
          if(count<=1){
           return res.status(400).send("Должна остаться хотя бы 1 запись!")
          }
          await AdminAuth.destroy({
            where:{
              [AdminAuthRow.id]:id
            },

          })
          console.log("count"+count);
          
          res.status(200).send("OK")
        } catch (error) {
          console.log(error);
          
          res.status(500).send("no worker")
        }
      }
      adminListAdd:ControllerFunction=async(req, res) => {
        try {
          
          const {login,pass} = req.body;
          console.log(req.body);
          
          if(!login||!pass){
            return res.status(400).send("Нет логина или пароля")
          }
          const passHash= crypto.createHash('sha256').update(pass).digest('hex');
          await AdminAuth.create({
            [AdminAuthRow.login]:login,
            [AdminAuthRow.pass_hash]:passHash

          });
          
          
          res.status(200).send("OK")
        } catch (error) {
          console.log(error);
          
          res.status(500).send("no worker")
        }
      }
      activeMail:ControllerFunction=async(req, res) => {
        try {
          
          const mail =await WhiteEmailList.findOne()
          
          
          res.status(200).send(mail.email)
        } catch (error) {
          console.log(error);
          
          res.status(500).send("no worker")
        }
      }
      activeMailUpdate:ControllerFunction=async(req, res) => {
        try {
          
          const {mail} = req.body;
          if(!mail){
            return res.status(400).send("Не указана почта")
          }
          await WhiteEmailList.truncate()
          await WhiteEmailList.create({
            [WhiteEmailListRow.email]:mail
          })

          
          
          res.status(200).send("OK")
        } catch (error) {
          console.log(error);
          
          res.status(500).send("no worker")
        }
      }
      pbList:ControllerFunction=async(req, res) => {
        try {
          
          const pb =await PbList.findAll()
          
          
          res.status(200).send(pb.map(el=>({login:el.login,id:el.id})))
        } catch (error) {
          console.log(error);
          
          res.status(500).send("no worker")
        }
      }
      pbListDelete:ControllerFunction=async(req, res) => {
        try {
          const id=req.body["id"];
          if(!id){
            res.status(400).send("error")
          }
          await PbList.destroy({
            where:{
              [AdminAuthRow.id]:id
            },

          })
          
          res.status(200).send("OK")
        } catch (error) {
          console.log(error);
          
          res.status(500).send("no worker")
        }
      }
      pbListAdd:ControllerFunction=async(req, res) => {
        try {
          
          const {login,pass} = req.body;
          console.log(req.body);
          
          if(!login||!pass){
            return res.status(400).send("Нет логина или пароля")
          }
          const passHash= crypto.createHash('sha256').update(pass).digest('hex');
          await PbList.create({
            [PbListRow.login]:login,
            [PbListRow.passHash]:passHash

          });
          
          
          res.status(200).send("OK")
        } catch (error) {
          console.log(error);
          
          res.status(500).send("no worker")
        }
      }
  }
export default new AuthController()
