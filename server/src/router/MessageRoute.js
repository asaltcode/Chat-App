import express from "express";
import MessageController from "../controller/MessageController.js"

const router = express.Router()

router.post("/", MessageController.addMessage)
router.get("/:chatId", MessageController.getMessage)

export default router