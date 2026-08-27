import { Router } from "express";

import CreateRoute from './auth.route'



const router = Router()

router.use('/register', CreateRoute)



export default router