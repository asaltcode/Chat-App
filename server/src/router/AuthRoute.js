import express from 'express';
import AuthController from '../controller/Authcontroller.js';
// import { loginUser, registerUser } from '../controllers/AuthController.js';


const routers = express.Router()

routers.post('/register', AuthController.registerUser)
routers.post('/login', AuthController.loginUser)
routers.get('/logout', AuthController.logout)

export default routers