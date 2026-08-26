import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/appError";
import jwt from 'jsonwebtoken'
import { JwtPayload } from "../types/authenticate.types";



export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.token

        if (!token) {
            throw new AppError("Unauthorize", 401)
        }

        const decode = jwt.verify(
            token,
            process.env.JWT_SECRET!
        ) as JwtPayload

        req.user = {
            id: decode.id
        }

        next()
    } catch (err) {
        next(new AppError('Invalida token', 401))
    }
}