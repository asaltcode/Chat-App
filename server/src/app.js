import express from "express"
import cors from "cors"
import AppRouters from "./router/index.js"
import cookieParser from "cookie-parser"
import errorHandle from "./middleware/error.js"

const app = express()

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use("/api/v1", AppRouters)
app.use(errorHandle)


export default app