import { getshortUrl } from "../dao/shortURL.js";
import { createShortUrlWithoutUserService, createShortUrlWithUserService } from "../services/shortURL.services.js";
import wrapAsync from "../utils/tryCatchWrapper.js";

export const createShortUrl = wrapAsync(async (req, res) => {
    const { full_url, custom_slug } = req.body;
    let shortUrl;
    if (req.user) {
        shortUrl = await createShortUrlWithUserService(full_url, req.user._id, custom_slug);
    } else {
        shortUrl = await createShortUrlWithoutUserService(full_url);
    }
    res.status(200).json({ shortUrl: `${process.env.APP_URL}/${shortUrl}` });

})

export const redirectFromShortURL = wrapAsync(async (req, res) => {
    const { id } = req.params;
    const url = await getshortUrl(id);
    if (!url) throw new Error("Short URL is not found");
    res.redirect(url.full_url);
});

export const createCustomShortUrl = wrapAsync(async (req, res) => {
    const { url, slug } = req.body;
    const shortUrl = await createShortUrlWithoutUserService(url, customUrl);
    res.status(200).json({ shortUrl: `${process.env.APP_URL}/${shortUrl}` });

})