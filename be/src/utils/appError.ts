
export class AppError extends Error {
    public Statuscode: number

    constructor(message: string, statusCode: number) {
        super(message)

        this.Statuscode = statusCode

        Object.setPrototypeOf(this, AppError.prototype)

        Error.captureStackTrace(this)
    }
}