import { Skeleton } from "../ui/skeleton";

export const ChatListSkeleton = () => {
  return (
    <div
      className="grid grid-cols-[auto_1fr] grid-rows-2 py-2 gap-1 gap-x-6 items-center"
    >
      <Skeleton className="h-12 w-12 rounded-full row-span-2" />
      <div className="w-full flex justify-between">
        <Skeleton className="h-4 w-3/12" />
        <Skeleton className="h-4 w-1/12" />
      </div>
      <Skeleton className="h-4 w-2/12" />
    </div>
  );
}