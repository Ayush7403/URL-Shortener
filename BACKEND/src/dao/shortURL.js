import ShortUrl from "../models/shortURL.models.js";
import { ConflictError } from "../utils/errorHandler.js";
export const saveShortURL = async (shortUrl, longURL, userId) => {
    try {
        const newUrl = new ShortUrl({
            full_url: longURL,
            short_url: shortUrl
        })
        if (userId) {
            newUrl.user = userId
        }
        await newUrl.save()
    } catch (error) {
        if(error.code === 11000){throw new ConflictError("Short URL is already exist")}
        throw new Error(error.message)
    }
}

export const getshortUrl = async (shortUrl) => {
    return await ShortUrl.findOneAndUpdate({ short_url: shortUrl }, { $inc: { clicks: 1 }});
}
export const getCustomShortUrl = async (slug) => {
    return await ShortUrl.findOne({ short_url: slug })
}

