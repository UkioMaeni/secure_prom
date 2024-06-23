"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const authRouter = express.Router();
const authController_1 = require("../controllers/authController");
authRouter.post("/auth", authController_1.default.auth);
// userRouter.get("/profile/:userId",UserController.profileUser);
// userRouter.get("/find",UserController.find);
// userRouter.post("/addfriends",UserController.addFriends);
// userRouter.delete("/",UserController.createUser); 
exports.default = authRouter;
