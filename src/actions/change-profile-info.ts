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

  const { id, ...rest } = validatedFields.data;

  await db.user.update({
    where: {
      id,
    },
    data: {
      ...rest,
    },
  });

  return { success: "Profile updated" };
};
