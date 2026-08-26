import express, { Application } from 'express'
import { errorHandler } from './middleware/errorHandler'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app: Application = express()

app.use(cookieParser())
app.use(cors({
    origin: ['http://localhost:5173'],
    credentials: true
}))
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: true }))


app.use(errorHandler)

export default app