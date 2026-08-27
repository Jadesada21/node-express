import { Router } from "express";
import { CreateUserController } from "../controller/auth.controller";



const router = Router()

router.route('/')
    .post(CreateUserController)

export default router