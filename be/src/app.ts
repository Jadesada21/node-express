import express, { Application } from 'express'
import { errorHandler } from './middleware/errorHandler'

const app: Application = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use(errorHandler)

export default app