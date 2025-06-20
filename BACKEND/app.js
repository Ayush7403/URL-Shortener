import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/config/mongo.config.js"
import short_url from "./src/routes/shortURL.routes.js"
import user_routes from "./src/routes/user.routes.js";
import auth_routes from "./src/routes/auth.routes.js"
import { redirectFromShortURL } from "./src/controllers/shortURL.controllers.js";
import { errorHandler } from "./src/utils/errorHandler.js";
import cors from "cors";
import { attachUser } from "./src/utils/attachUser.js";
import cookieParser from "cookie-parser";

dotenv.config("./.env");

const app = express();
const port = process.env.PORT || 8000;

app.use(cors({
  origin: "https://url-shortener-frontend-silk.vercel.app/",
  credentials:true
}));

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());

app.use(attachUser)

app.use("/api/user", user_routes);
app.use("/api/auth", auth_routes)
app.use("/api/create",short_url)
app.get("/:id",redirectFromShortURL)

app.use(errorHandler);

app.listen(port,()=>{
    connectDB()
    console.log(`server is running on ${process.env.APP_URL} `)
})

export default app;
//GET-Redirect 
//POST- Creat Short URL