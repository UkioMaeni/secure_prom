const express = require('express');
const adminPanelRouter = express.Router();
import adminPanelController from "../controllers/adminPanelController";
import multer = require("multer");

adminPanelRouter.post("/admin/auth",adminPanelController.auth);
const storage = multer.memoryStorage();
const uploadMiddleWare = multer({ storage });
adminPanelRouter.post("/admin/update_db",uploadMiddleWare.single("file"),adminPanelController.updateDb);
adminPanelRouter.get("/admin/dblist",adminPanelController.dblist);
adminPanelRouter.get("/admin/admin_list",adminPanelController.adminList);
adminPanelRouter.delete("/admin/admin_list",adminPanelController.adminListDelete);
adminPanelRouter.post("/admin/admin_list",adminPanelController.adminListAdd);
adminPanelRouter.get("/admin/active_mail",adminPanelController.activeMail);
adminPanelRouter.put("/admin/active_mail",adminPanelController.activeMailUpdate);
adminPanelRouter.get("/admin/pb_list",adminPanelController.pbList);
adminPanelRouter.delete("/admin/pb_list",adminPanelController.pbListDelete);
adminPanelRouter.post("/admin/pb_list",adminPanelController.pbListAdd);
// userRouter.get("/profile/:userId",UserController.profileUser);
// userRouter.get("/find",UserController.find);
// userRouter.post("/addfriends",UserController.addFriends);
// userRouter.delete("/",UserController.createUser); 

export default adminPanelRouter;