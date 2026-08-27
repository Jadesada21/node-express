import { CreateUserInput, UserResponse } from "../types/auth.types";
import bcrypt from 'bcrypt'
import { AppError } from "../utils/appError";
import prisma from "../prisma/prisma";
import { safeResponse } from "../utils/safeData";


function ValidateCreateInput(body: CreateUserInput) {
    const { username, password } = body

    if (!username || username.length < 5 || username.length > 20) {
        throw new AppError('Username must be length between 5-20 character', 400)
    }

    if (!password || password.length < 6) {
        throw new AppError('Password must be minimun 6 character', 400)
    }
}

export const CreateUserService = async (body: CreateUserInput): Promise<UserResponse> => {
    ValidateCreateInput(body)

    const { username, password } = body

    const existing = await prisma.user.findUnique({ where: { username: username } })
    if (existing) {
        throw new AppError('Username already used', 409)
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const res = await prisma.user.create({
        data: {
            username,
            password: hashedPassword
        }
    })

    const { password: _pw, ...safeResponse } = res

    return safeResponse
}