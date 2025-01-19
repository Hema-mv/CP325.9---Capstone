//routes/user.mjs
//Imports

import express from "express";
const router=express.Router();
import  userController from "../controllers/user.mjs";

//this correspondes to register on the frontend
//becuase register means add a new user
router.post('/',userController.create)
router.post('/login',userController.login)
export default router;
