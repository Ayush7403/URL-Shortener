import express from "express";
import { createShortUrl } from "../controllers/shortURL.controllers.js";

const router = express.Router();

router.post("/",createShortUrl)

export default router;