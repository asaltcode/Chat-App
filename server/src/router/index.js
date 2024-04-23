import express from "express"
import AuthRouter from "./AuthRoute.js"
import ChatRouter from "./ChatRoute.js"
import MessageRuter from "./MessageRoute.js"
import UserRouter from "./UserRoute.js"

const routers = express.Router()

routers.use("/auth", AuthRouter)
routers.use("/chat", ChatRouter)
routers.use("/message", MessageRuter)
routers.use("/user", UserRouter)

export default routers