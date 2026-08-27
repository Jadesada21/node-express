import { Router } from "express";

import CreateRoute from './create.route'
import LoginRoute from './login.route'


const router = Router()

router.use('/auth', CreateRoute, LoginRoute)


export default router