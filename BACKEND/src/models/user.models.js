import mongoose from "mongoose";
import bcrypt from "bcrypt"

const user = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        select:false
    },
    avatar:{
        type:String,
        default: () => `https://api.dicebear.com/7.x/avataaars/svg?seed=${Math.random().toString(36).substring(2)}`,
        required:false,
        
    }
})

user.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password)
}

user.set('toJSON',{
    transform: function(doc, ret){
        delete ret.password;
        delete ret.__v;
        return ret;
    }
});

user.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const User = mongoose.model("User", user);

export default User;