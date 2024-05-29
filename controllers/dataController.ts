import { Request, Response } from 'express';
import Auth,{AuthRow} from '../models/auth';
import crypto = require('crypto');
import FullInfo from '../models/full_info';
type ControllerFunction = (req: Request, res: Response) => void;

class UserController {

     getFullInfo:ControllerFunction=async(req, res) => {
        try {
          const fullInfo=await FullInfo.findAll()
          res.send(fullInfo);
        } catch (error) { 
          console.log(error);
          res.status(500).send(error);
        }
      }
  }
export default new UserController()
