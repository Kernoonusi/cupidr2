"use server";

import * as z from "zod";

import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { PreferencesSchema } from "@/schemas";

export const setPreferences = async (
  values: z.infer<typeof PreferencesSchema>,
) => {
  try {
    const user = await currentUser();

    if (!user?.id) {
      return { error: "Unauthorized" };
    }

    const validatedFields = PreferencesSchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: "Invalid fields" };
    }

    const { gender, agePref } = validatedFields.data;

    const existingPreferences = await db.preferences.findFirst({
      where: {
        userId: user.id,
      },
    });

    if (existingPreferences) {
      await db.preferences.update({
        where: {
          userId: user.id,
        },
        data: {
          maxAge: agePref[1],
          minAge: agePref[0],
          gender,
        },
      });
    } else {
      await db.preferences.create({
        data: {
          userId: user.id,
          maxAge: agePref[1],
          minAge: agePref[0],
          gender,
        },
      });
    }

    return { success: "Preferences updated successfully" };
  } catch (error) {
    console.log(error);
    return { error: "An error occurred" };
  }
};
