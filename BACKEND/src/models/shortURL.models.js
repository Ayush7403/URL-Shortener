import mongoose from "mongoose";

const shortURL = new mongoose.Schema({
    full_url:{
        type: String,
        required: true,
    },
    short_url:{
        type: String,
        required:true,
        unique: true,
        index:true
    },
    clicks:{
        type: Number,
        required: true,
        default: 0,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    
});

const ShortUrl = mongoose.model("shortUrl",shortURL);

export default ShortUrl;