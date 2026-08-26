import { Prisma } from "@prisma/client";
import { NextFunction, Request, Response } from "express";


export const errorHandler = (
    err: unknown,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.log(err)

    // Known Prisma errors (มี error code ชัดเจน)
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
        switch (err.code) {
            case 'P2002':
                return res.status(409).json({
                    status: 'error',
                    message: `Duplicate value for field: ${err.meta?.target}`,
                })
            case 'P2025':
                return res.status(404).json({
                    status: 'error',
                    message: 'Record not found'
                })
            case 'P2003':
                return res.status(400).json({
                    status: 'error',
                    message: `Foreign key constraint failed on field : ${err.meta?.field_name}`
                })
            default:
                return res.status(400).json({
                    status: 'error',
                    message: `Database error : ${err.code}`
                })
        }
    }

    // Validate error (ส่ง Fields/type ผิด)
    if (err instanceof Prisma.PrismaClientValidationError) {
        return res.status(400).json({
            status: 'error',
            message: 'Invalid data send to database'
        })
    }

    // Connection/initialization error
    if (err instanceof Prisma.PrismaInitializationError) {
        return res.status(500).json({
            status: 'error',
            message: 'Database connection failed'
        })
    }

    // Error อื่นๆที่ไม่ใช่ Prisma
    if (err instanceof Error) {
        return res.status(500).json({
            status: 'error',
            message: err.message
        })
    }

    // Fallback สุดท้าย
    return res.status(500).json({
        status: 'error',
        message: 'Internal server error'
    })
}