"use server";

import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { deleteFile } from "@/lib/storage";

export const deleteImage = async (file_path: string) => {
  const user = await currentUser();

  const userHasImage = user?.images.some((image) => image.path === file_path);

  if (!userHasImage) {
    return { error: "You do not have permission to delete this image" };
  }

  try {
    await deleteFile(file_path);

    await db.images.delete({
      where: {
        path: file_path,
      },
    });

    return { success: "Image deleted!" };
  } catch (error) {
    return { error: "An error occurred" };
  }
};
