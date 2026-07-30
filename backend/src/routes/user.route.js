import express from "express";
import {loginUser,addUser,getMe} from "../controllers/user.controller.js"
import authMiddleWare from "../middleware/auth.js"
const userRouter=express.Router();

userRouter.post("/register",addUser);
userRouter.post("/login",loginUser);
userRouter.get("/me",authMiddleWare,getMe);


export default userRouter;
