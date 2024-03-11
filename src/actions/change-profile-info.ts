"use server";

import * as z from "zod";

import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { ProfileSchema } from "@/schemas";

export const changeProfileInfo = async (
  values: z.infer<typeof ProfileSchema>,
) => {
  const user = await currentUser();
  const validatedFields = ProfileSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  try {
    const { ...rest } = validatedFields.data;

    await db.user.update({
      where: {
        id: user?.id,
      },
      data: {
        ...rest,
      },
    });

    return { success: "Profile updated" };
  } catch (error) {
    return { error: "An error occurred" };
  }
};
