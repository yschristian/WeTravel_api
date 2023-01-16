import express from "express";
import bodyParser from "body-parser";
import cors from "cors"
import morgan from "morgan";
import path from "path";
import dotenv from "dotenv"
import { fileURLToPath } from "url";
import helmet from "helmet";
import dbConnect from "./src/database/dbConnect.js"
import UserRoutes from "./src/Routes/user";
import postRoutes from "./src/Routes/posts";
import AuthRoutes from "./src/Routes/Auth";
// import { users, posts } from "./src/data/index.js";
// import User from "./src/Models/User.js";
// import Post from "./src/Models/Post.js";


const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
dotenv.config()

const app = express()
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }))
app.use(morgan("common"))
app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
app.use(cors())
app.use("/assets",express.static(path.join(__dirname,"public/assets ")))

app.use("/auth", AuthRoutes);
app.use("/users", UserRoutes);
app.use("/posts", postRoutes);

dbConnect()

const port = process.env.PORT

app.listen(port,()=>{
    console.log(`server is running at http://localhost:${port}`)
    // User.insertMany(users);
    // Post.insertMany(posts);
})