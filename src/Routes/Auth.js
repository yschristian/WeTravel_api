import express  from "express";
import AuthController from "../Controllers/auth"; 
const AuthRoutes = express.Router()

AuthRoutes.post('/auh/register', AuthController.register);
AuthRoutes.post("/auth/login", AuthController.login);
export default AuthRoutes