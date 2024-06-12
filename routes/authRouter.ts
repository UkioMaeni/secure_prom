const express = require('express');
const authRouter = express.Router();
import authController from "../controllers/authController";

authRouter.post("/auth",authController.auth);


// userRouter.get("/profile/:userId",UserController.profileUser);
// userRouter.get("/find",UserController.find);
// userRouter.post("/addfriends",UserController.addFriends);
// userRouter.delete("/",UserController.createUser); 

export default authRouter;