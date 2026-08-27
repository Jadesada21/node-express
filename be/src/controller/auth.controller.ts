import { NextFunction, Request, Response } from "express";
import { CreateUserInput } from "../types/auth.types";
import { AppError } from "../utils/appError";
import { CreateUserService } from "../service/auth.service";


export const CreateUserController = async (req: Request<CreateUserInput>, res: Response, next: NextFunction) => {
    try {
        const { username, password } = req.body

        if (!username || !password) {
            throw new AppError('Missing required fields', 400)
        }

        const newUser = await CreateUserService(req.body)
        return res.status(201).json({ newUser })
    } catch (err) {
        next(err)
    }

}