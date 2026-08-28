import { Router } from "express";
import { GetMeController } from "../controller/auth.controller";
import { authenticate } from "../middleware/auth.middleware";


const router = Router()

router.route('/me')
    .get(authenticate, GetMeController)

export default router   