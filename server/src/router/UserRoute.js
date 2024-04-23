import express from "express"
import UserController from "../controller/UserController.js"
import Authenticate from "../middleware/Authenticate.js"

const router = express.Router()

router.get("/search", UserController.searchUser)
router.get("/all", Authenticate.isAuthenticatedUser, Authenticate.authorizeRole("admin"), UserController.getAllUser)
router.get("/:id",Authenticate.isAuthenticatedUser, Authenticate.authorizeRole("admin", "user"), UserController.getUserById)
router.get("/", Authenticate.isAuthenticatedUser, Authenticate.authorizeRole("admin", "user"), UserController.getUser)

export default router

