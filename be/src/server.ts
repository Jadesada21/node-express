import dotenv from 'dotenv'
dotenv.config()

import app from './app'
import prisma from './prisma/prisma'

app.get('/health', async (req, res) => {
    try {
        await prisma.$queryRaw`Select 1`
        res.json({ status: "OK", database: "connected" })
    } catch (err) {
        res.status(500).json({ status: "error", database: 'disconnected' })
    }
})

const server = async () => {
    try {
        const PORT = Number(process.env.PORT || 4040)

        await prisma.$connect()
        console.log('✅ Database connected successfully')

        app.listen(PORT, () => {
            console.log(`Server is runing on ${PORT}`)
        })
    } catch (err) {
        console.error('Failed to connect to database', err)
        process.exit(1)
    }
}

server()

process.on('SIGINT', async () => {
    await prisma.$disconnect()
    process.exit(0)
})

process.on('SIGTERM', async () => {
    await prisma.$disconnect()
    process.exit(0)
})