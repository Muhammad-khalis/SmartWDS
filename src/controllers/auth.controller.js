/*
👉 Controller handles HTTP layer.
It:
Receives request (req)
Calls service
Sends response (res)
Handles next(error)*/

import { registerUserService, loginUserService } from "../services/auth.service.js";

export const register= async(req,res,next)=>{
  try {
    const user=await registerUserService(req.body);
    res.status(201).json({success: true, message: "user register",user})
  } catch (error) {
    next(error);
  }
};

// login

export const login=async(req,res,next)=>{
   try {
     const {email,password}=req.body;
     const {user,token}=await loginUserService(email,password);
     res.status(201).json({success: true,user,token});
   } catch (error) {
    next(error)
   }
};
