const express = require('express');
const adminPanelRouter = express.Router();
import adminPanelController from "../controllers/adminPanelController";
import multer = require("multer");

adminPanelRouter.post("/admin/auth",adminPanelController.auth);
const storage = multer.memoryStorage();
const uploadMiddleWare = multer({ storage });
adminPanelRouter.post("/admin/update_db",uploadMiddleWare.single("file"),adminPanelController.updateDb);

// userRouter.get("/profile/:userId",UserController.profileUser);
// userRouter.get("/find",UserController.find);
// userRouter.post("/addfriends",UserController.addFriends);
// userRouter.delete("/",UserController.createUser); 

export default adminPanelRouter;