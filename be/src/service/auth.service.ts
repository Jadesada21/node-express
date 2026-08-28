import { UserInput, LoginResponse, UserResponse } from "../types/auth.types";
import bcrypt from 'bcrypt'
import { AppError } from "../utils/appError";
import prisma from "../prisma/prisma";
import jwt from 'jsonwebtoken'


function ValidateCreateInput(body: UserInput) {
    const { username, password } = body

    if (!username || username.length < 5 || username.length > 20) {
        throw new AppError('Username must be length between 5-20 character', 400)
    }

    if (!password || password.length < 6) {
        throw new AppError('Password must be minimun 6 character', 400)
    }
}

export const CreateUserService = async (body: UserInput): Promise<UserResponse> => {
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

export const LoginUserService = async (input: UserInput): Promise<LoginResponse> => {
    const { username, password } = input

    const user = await prisma.user.findUnique({ where: { username } })
    if (!user) {
        throw new AppError('Username not found', 401)
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
        throw new AppError('Password Invalid', 401)
    }

    const token = jwt.sign(
        {
            id: user.id
        },
        process.env.JWT_SECRET as string,
        {
            expiresIn: '1d'
        }
    )
    const { password: _pw, ...safeResponse } = user

    return { token, user: safeResponse }
}


export const LogoutService = () => {
    return {
        message: "Logout successfully"
    }
}

export const GetMeService = async (id: number): Promise<UserResponse> => {

    const user = await prisma.user.findUnique({ where: { id } })

    if (!user) {
        throw new AppError('User not found', 400)
    }

    const { password: _pw, ...safeResponse } = user

    return safeResponse
}