import { db } from '@/lib/db';

export const getImagesByUserId = async (userId: string) => {
  try {
    const images = await db.images.findMany({
      where: {
        userId,
      },
    });
    return images;
  } catch (error) {
    return null;
  }
};
