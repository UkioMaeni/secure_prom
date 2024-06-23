"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const dataRouter = express.Router();
const dataController_1 = require("../controllers/dataController");
dataRouter.get("/full", dataController_1.default.getFullInfo);
dataRouter.post("/full", dataController_1.default.addJurnal);
// userRouter.get("/profile/:userId",UserController.profileUser);
// userRouter.get("/find",UserController.find);
// userRouter.post("/addfriends",UserController.addFriends);
// userRouter.delete("/",UserController.createUser); 
exports.default = dataRouter;
