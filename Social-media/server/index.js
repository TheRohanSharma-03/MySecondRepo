const express = require("express");
const dotenv = require("dotenv");
const dbConnect = require("./dbConnect");
const authRouter = require("./routers/authRouter");
const postsRouter = require("./routers/postsRouter");
const userRouter = require("./routers/userRouter");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
/*
const cloudinary = require("cloudinary").v2;
dotenv.config("./.env");

import {v2 as cloudinary} from 'cloudinary';

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});
*/
const cloudinary = require("cloudinary").v2;

dotenv.config("./.env");

// Configuration
cloudinary.config({
    secure: true,
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    /*api_environment_variable: process.env.CLOUDINARY_URL*/
});


const app = express();

//middlewares
app.use(express.json({ limit: "10mb" }));
app.use(morgan("common"));
app.use(cookieParser());
let origin = 'http://localhost:3000';
console.log('here env', process.env.NODE_ENV);
if(process.env.NODE_ENV === 'production') {
    origin = process.env.CORS_ORIGIN;
}
app.use(
    cors({
        credentials: true,
        origin
    })
);

app.use("/auth", authRouter);
app.use("/posts", postsRouter);
app.use("/user", userRouter);
app.get("/", (req, res) => {
    res.status(200).send("OK from Server");
});

const PORT = process.env.PORT || 4001;

dbConnect();
app.listen(PORT, () => {
    console.log(`listening on port: ${PORT}`);
});
