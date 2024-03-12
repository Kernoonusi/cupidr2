import { Skeleton } from "@/components/ui/skeleton";

export function SwipeSkeleton() {
  return (
    <>
      <Skeleton className="mt-4 aspect-[9/16] rounded-3xl h-[75dvh] md:h-[85dvh] sm:aspect-[14/16]" />
      <div className="w-3/4 absolute bottom-32 left-10 flex flex-col gap-2">
        <Skeleton className="h-10 w-20 bg-slate-300" />
        <Skeleton className="h-5 w-60 bg-slate-300" />
        <Skeleton className="h-5 w-60 bg-slate-300" />
      </div>
      <Skeleton className="absolute h-20 w-20 rounded-full left-10 bottom-8 bg-secondary dark:bg-secondary" />
      <Skeleton className="absolute h-20 w-20 rounded-full right-10 bottom-8 bg-primary dark:bg-primary" />
    </>
  );
}
