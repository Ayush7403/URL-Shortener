import { generateNanoId } from "../utils/helper.js";
import {getCustomShortUrl, saveShortURL } from "../dao/shortURL.js";
import ShortUrl from "../models/shortURL.models.js";


export const createShortUrlWithoutUserService = async (url)=>{
    const shortUrl = generateNanoId(7)
    if(!shortUrl) throw new Error("Short URL not generated")
    await saveShortURL(shortUrl,url)
    return shortUrl
}

export const createShortUrlWithUserService = async (url, userId, slug=null)=>{
    const shortUrl = slug || generateNanoId(7)
    const exists = await getCustomShortUrl(slug);
    if(exists){
        throw new Error("This custom url is already exist")
    }

    await saveShortURL( shortUrl, url, userId)
    return shortUrl
}