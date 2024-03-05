'use server';

import { currentUser } from '@/lib/auth';
import { uploadFile } from '@/lib/storage';
import { db } from '@/lib/db';

export const upload = async (formData: FormData) => {
  const user = await currentUser();

  const formImages = formData.getAll('image') as File[];

  if (user && user?.images.length + formImages.length > 5) {
    return { error: 'You can only upload 5 images' };
  }

  const imagesData = [];

  try {
    for (const image of formImages) {
      const result = await uploadFile(image);
      if (result && result.url) {
        imagesData.push({ userId: user?.id as string, url: result.url, path: result.path });
      }
    }

    await db.images.createMany({
      data: imagesData,
    });

    return { success: 'Images uploaded!' };
  } catch (error) {
    return { error: 'An error occurred' };
  }
};
