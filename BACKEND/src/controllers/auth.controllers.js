import {cookieOptions} from "../config/config.js"
import { loginUser, registerUser } from "../services/auth.services.js";
import wrapAsync from "../utils/tryCatchWrapper.js"

export const register = wrapAsync( async (req, res)=>{
    const{name, email, password} = req.body;
    const {token, user} = await registerUser(name, email, password);
    req.user = user;
    res.cookie("accessToken",token, cookieOptions)
    res.status(200).json({message:"Register success!!"})
})
export const login = wrapAsync( async (req, res)=>{
    const{ email, password} = req.body;
    const {token, user} = await loginUser(email, password);
    req.user = user;
    res.cookie("accessToken",token, cookieOptions);
    res.status(200).json({user:user, message:"login success!!"});
})

export const logout = wrapAsync(async(req, res)=>{
    res.clearCookie("accessToken", cookieOptions);
    res.status(200).json({message:"Logout Successfully"})
})

export const getCurrentUser = wrapAsync(async (req, res) => {
  res.status(200).json({user: req.user});
});