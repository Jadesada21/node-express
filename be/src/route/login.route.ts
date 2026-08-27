import { Router } from "express";
import { LoginuserController } from "../controller/auth.controller";


const router = Router()

router.route('/login')
    .post(LoginuserController)


export default router