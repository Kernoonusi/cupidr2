import { Cities } from "../src/constants/index";
import { Gender, GenderPreference, PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const imagesUrl = [
  "example.com",
  "example.com",
  "example.com",
  "example.com",
  "example.com",
];

const names = [
  "Alice",
  "Bob",
  "Charlie",
  "David",
  "Eve",
  "Frank",
  "Grace",
  "Harry",
  "Ivy",
  "Jack",
  "Kate",
  "Leo",
  "Mary",
  "Nick",
  "Olivia",
  "Peter",
  "Quinn",
  "Ryan",
  "Sara",
  "Tom",
  "Ursula",
  "Violet",
  "Walter",
  "Xavier",
  "Yvonne",
  "Zachary",
  "Abby",
  "Carter",
  "Dylan",
  "Emily",
];

async function main() {
  for (let i = 0; i < 20; i++) {
    await prisma.user.create({
      data: {
        email: `${names[i] + i}@example.com`,
        name: `${names[i]}`,
        password: `${await bcrypt.hash(`password${i + 1}`, 10)}`,
        age: Math.floor(Math.random() * (25 - 18 + 1)) + 18,
        gender: Math.random() < 0.5 ? Gender.male : Gender.female,
        image: "example.com",
        bio: `I like to code. I am bot ${i + 1}.`,
        location: Cities.chelyabinsk,
        preferences: {
          create: {
            minAge: 18,
            maxAge: 25,
            gender: GenderPreference.both,
          },
        },
        images: {
          createMany: {
            data: [
              { url: `example${i + 1}.com`, path: `${names[i] + (Math.random() * 100) }` },
            ]
          },
        },
      },
    });
  }
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
