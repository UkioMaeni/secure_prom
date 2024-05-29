const express = require('express');
const dataRouter = express.Router();
import dataController from "../controllers/dataController";

dataRouter.get("/full",dataController.getFullInfo);

// userRouter.get("/profile/:userId",UserController.profileUser);
// userRouter.get("/find",UserController.find);
// userRouter.post("/addfriends",UserController.addFriends);
// userRouter.delete("/",UserController.createUser); 

export default dataRouter;