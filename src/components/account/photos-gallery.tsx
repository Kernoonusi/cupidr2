"use client";
import Image from "next/image";

import { EmptyPhoto } from "@/components/account/empty-photo";
import { DeletePhoto } from "@/components/account/delete-photo";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useDirectLink } from "@/hooks/use-direct-link";

interface UserImage {
  url: string;
  path: string;
}

const PhotoItem = ({ image }: { image: UserImage }) => {
  return (
    <div className="relative">
      <DeletePhoto path={image.path} />
      <Image
        src={useDirectLink(image.url)}
        alt="user photos"
        className="object-cover h-full w-full aspect-[3/4] rounded-lg"
        width={360}
        height={640}
        quality={90}
        loading="lazy"
        onError={(e) => {
          // Обработка ошибок загрузки изображения
          console.error(`Error loading image: ${image.url}`);
          e.currentTarget.style.display = "none";
        }}
      />
    </div>
  );
};

export function PhotosGallery() {
  const user = useCurrentUser();
  const maxPhotos = 5;

  const emptyPhotos = Array.from(
    { length: user?.images?.length ? maxPhotos - user.images.length : 3 },
    (_, i) => <EmptyPhoto key={`empty-${i}`} i={i} />,
  );

  return (
    <div className="grid grid-cols-3 gap-4">
      {user?.images?.map((image) => (
        <PhotoItem key={image.url} image={image} />
      ))}

      {user &&
        ((user.images && user.images.length < maxPhotos) || !user?.images) &&
        emptyPhotos}
    </div>
  );
}
