"use client";
import Image from "next/image";

import { EmptyPhoto } from "@/components/account/empty-photo";
import { DeletePhoto } from "@/components/account/delete-photo";
import { useCurrentUser } from "@/hooks/use-current-user";

export function PhotosGallery() {
  const user = useCurrentUser();

  const emptyPhotos = [];

  for (let i = 0; i < (user?.images?.length ? 5 - user.images.length : 3); i++) {
    emptyPhotos.push(<EmptyPhoto i={i} />);
  }

  return (
    <div className={`grid grid-cols-3 gap-4`}>
      {user?.images?.map((image) => (
        <div key={image.url} className="relative">
          <DeletePhoto path={image.path} />
          <Image
            src={image.url}
            alt="user photos"
            className="object-cover h-full w-full aspect-[3/4] rounded-lg"
            width={360}
            height={640}
          />
        </div>
      ))}
      {user && ((user.images && user.images.length < 6) || !user?.images) && emptyPhotos}
    </div>
  );
}
