import { Router } from "express";

import CreateRoute from './create.route'
import LoginRoute from './login.route'

import { authenticate } from "../middleware/auth.middleware";
import GetMeRoute from './getMe.route'

const router = Router()

router.use('/auth', CreateRoute, LoginRoute, GetMeRoute)

router.use(authenticate)


export default router