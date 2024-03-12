import { $Enums } from "@prisma/client";

// export interface User {
//   id: number;
//   name: string;
//   photos: string[];
//   age: number;
//   location: string;
//   description: string;
// }

export interface User {
  images: {
    id: string;
    userId: string;
    url: string;
    path: string;
  }[];
  id: string;
  name: string | null;
  email: string | null;
  age: number | null;
  gender: $Enums.Gender | null;
  bio: string | null;
  location: string | null;
}
