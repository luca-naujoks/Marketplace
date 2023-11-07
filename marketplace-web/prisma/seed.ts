import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
    const password = await hash("changeME", 12);
    const user = await prisma.accounts.upsert({
        where: {email: "admin@bobby68.de"},
        update: {},
        create:{
            email: "bobby68@bobby68.de",
            first_name: "Bobby",
            last_name: "Bot",
            adress: "test straße 1",
            password,
        }
    })
    console.log({user})
}

main()
.then(() => prisma.$disconnect())
.catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
})