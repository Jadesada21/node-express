import { Router } from "express";
import { CreateUserController } from "../controller/auth.controller";



const router = Router()

router.route('/register')
    .post(CreateUserController)

export default router