import User from "../models/user.models.js"
import ShortUrl from "../models/shortURL.models.js"

export const findUserByEmail = async(email)=>{
    return await User.findOne({email})
}

export const findUserByEmailByPassword = async(email)=>{
    return await User.findOne({email}).select("+password")
}

export const findUserById = async(id)=>{
    return await User.findById(id)
}

export const createUser = async(name, email, password)=>{
    const newUser = new User({name, email, password});
    await newUser.save();
    return newUser;
}

export const getAllUserUrlsDao = async(id)=>{
    return await ShortUrl.find({user:id})
}