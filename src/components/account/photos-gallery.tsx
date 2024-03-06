import Image from "next/image";

import { EmptyPhoto } from "./empty-photo";
import { DeletePhoto } from "./delete-photo";
import { currentUser } from "@/lib/auth";

const photo = [
  "/userPhotos/1.png",
  "/userPhotos/2.png",
  "/userPhotos/3.png",
  "/userPhotos/4.png",
  "/userPhotos/5.png",
  // "/userPhotos/6.png",
];

export default async function PhotosGallery() {
  const user = await currentUser();

  const emptyPhotos = [];

  for (let i = 0; i < 6; i++) {
    emptyPhotos.push(<EmptyPhoto i={i} />);
  }

  return (
    <div className={`grid grid-cols-3 gap-4`}>
      {user &&
        user.images &&
        user.images.map((image, index) => (
          <div key={index} className="relative">
            <DeletePhoto path={image.path} />
            <Image
              src={image.url}
              alt="user photos"
              className="object-cover rounded-lg"
              width={360}
              height={640}
            />
          </div>
        ))}
      {photo.length < 6 && emptyPhotos}
    </div>
  );
}
