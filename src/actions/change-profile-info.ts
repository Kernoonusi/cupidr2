"use server";

import * as z from "zod";

import { db } from "@/lib/db";
import { ProfileSchema } from "@/schemas";

export const changeProfileInfo = async (
  values: z.infer<typeof ProfileSchema>,
) => {
  const validatedFields = ProfileSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const { id, description, gender, location, age } = validatedFields.data;

  await db.user.update({
    where: {
      id,
    },
    data: {
      bio: description,
      gender,
      geolocation: location,
      age,
    },
  });

  return { success: "Profile updated" };
};
