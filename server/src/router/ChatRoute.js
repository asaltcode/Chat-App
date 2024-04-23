import express from "express"
import ChatController from "../controller/ChatController.js"
import Authenticate from "../middleware/Authenticate.js"

const router = express.Router()


router.post("/", Authenticate.isAuthenticatedUser, Authenticate.authorizeRole("admin", "user"), ChatController.createChat)
router.get("/find/:firstId/:secondId", Authenticate.isAuthenticatedUser, Authenticate.authorizeRole("admin", "user"), ChatController.findChat)
router.get("/", Authenticate.isAuthenticatedUser, Authenticate.authorizeRole("admin", "user"), ChatController.userChats)


export default router