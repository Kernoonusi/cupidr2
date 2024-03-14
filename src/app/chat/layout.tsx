"use client";

import { useMediaQueries } from "@/hooks/use-media-queries";
import { usePathname } from "next/navigation";

const ChatLayout = ({
  children,
  room,
}: {
  children: React.ReactNode;
  room: React.ReactNode;
}) => {
  const { sm } = useMediaQueries();
  const pathname = usePathname()?.split("/")[2];

  return (
    <main className="w-full h-full mx-auto mt-4 flex sm:max-w-7xl">
      <div
        className={`${pathname ? (sm ? "" : " hidden ") : " flex "} sm:border-r sm:min-w-[300px]`}
      >
        {children}
      </div>
      <div
        className={`flex-grow ${pathname || sm ? "" : "hidden"} sm:flex`}
      >
        {room}
      </div>
    </main>
  );
};

export default ChatLayout;
