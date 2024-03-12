import { Cities } from "../src/constants/index";
import { Gender, GenderPreference, PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const imagesUrl = [
    {
      url: "https://www.dropbox.com/scl/fi/y9zotvzyqq3e5hnzstrdd/1710250558795.png?rlkey=iq56wt208rudhc60rs07hhnoy&raw=1",
      path: "/1710250558795.png",
    },
    {
      url: "https://www.dropbox.com/scl/fi/in2jad58ccej1300sy816/1710250562343.png?rlkey=m8ywcb5kp7u7scv39tea2qvvx&raw=1",
      path: "/1710250562343.png",
    },
    {
      url: "https://www.dropbox.com/scl/fi/atxww7gk93cbbtqltt21g/1710250564791.png?rlkey=xm6kkkgr6yiqipluhh32903p7&raw=1",
      path: "/1710250564791.png",
    },
    {
      url: "https://www.dropbox.com/scl/fi/c4o9k75u5mbx8kfqj1n5f/1710250567173.png?rlkey=bvjjz5cbmayrei76v0508v0m4&raw=1",
      path: "/1710250567173.png",
    },
    {
      url: "https://www.dropbox.com/scl/fi/16h2bn51wgfttyqu6p08z/1710250569714.png?rlkey=sqphaqaqy1llbjf3zs852vzwy&raw=1",
      path: "/1710250569714.png",
    },
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
  for (let i = 0; i < imagesUrl.length; i++) {
    await prisma.user.create({
      data: {
        email: `${names[i] + Math.floor(Math.random() * 1000)}@example.com`,
        name: `${names[i]}`,
        password: `${await bcrypt.hash(`password${i + 1}`, 10)}`,
        age: Math.floor(Math.random() * (25 - 18 + 1)) + 18,
        gender: Math.random() < 0.5 ? Gender.male : Gender.female,
        image: imagesUrl[i].url,
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
              {
                url: imagesUrl[i].url,
                path: imagesUrl[i].path,
              },
            ],
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
