"use client";
import { XCircle } from "lucide-react";
import { useSession } from "next-auth/react";

import { deleteImage } from "@/actions/delete-image";

export function DeletePhoto({ path }: { path: string }) {
  const { update } = useSession();
  const onClick = (path: string) => {
    deleteImage(path).then(() => update());
  };

  return (
    <button
      type="button"
      className="absolute top-1 right-1 md:top-2 rounded-full md:right-2"
      onClick={() => onClick(path)}
    >
      <p className="sr-only">delete photo</p>
      <XCircle size={30} className="shadow-xl rounded-full" />
    </button>
  );
}
