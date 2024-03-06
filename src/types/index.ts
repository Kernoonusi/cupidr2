import { Gender } from "@prisma/client";

export interface User {
  id: number;
  name: string;
  photos: string[];
  age: number;
  location: string;
  description: string;
}

export interface IFilterInput {
  gender: Gender;
  agePref: number[];
}
