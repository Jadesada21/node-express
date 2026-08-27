import { Request, Response } from "express";
import { UserInput } from "../types/auth.types";
import { AppError } from "../utils/appError";
import { CreateUserService, LoginUserService } from "../service/auth.service";
import { asyncHandler } from "../utils/asyncHandler";


export const CreateUserController = asyncHandler(
    async (
        req: Request<{}, {}, UserInput>,
        res: Response
    ) => {

        const { username, password } = req.body

        if (!username || !password) {
            throw new AppError('Missing required fields', 400)
        }

        const newUser = await CreateUserService(req.body)
        return res.status(201).json({ newUser })
    }
)

export const LoginuserController = asyncHandler(
    async (
        req: Request<{}, {}, UserInput>,
        res: Response
    ) => {
        const { token, user } = await LoginUserService(req.body)

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? "none" : "lax",
            maxAge: 24 * 60 * 60 * 1000,
            path: '/'
        })

        return res.status(200).json({ user })
    }
)