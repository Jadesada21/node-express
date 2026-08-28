import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()


async function main() {

    const hashedPassword = await bcrypt.hash('password123', 10)

    const user = await prisma.user.upsert({
        where: { username: "hr_test" },
        update: {},
        create: {
            username: "hr_test",
            password: hashedPassword
        }
    })

    const position = await prisma.position.create({
        data: {
            title: 'Backend Developer',
            description: 'Node.js + Typescript + Prisma',
            createdById: user.id,
            criteria: {
                create: [
                    { keyword: 'Node.js', weight: 3, isRequired: true },
                    { keyword: 'Typescript', weight: 3, isRequired: true },
                    { keyword: 'Prisma', weight: 2, isRequired: false },
                    { keyword: 'Docker', weight: 1, isRequired: false },
                ]
            }
        }
    })

    console.log('Seeded user: ', user.username)
    console.log('Seeded position: ', position.title, '(id:', position.id + ')')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
