"use client";
import { usePathname } from "next/navigation";

import LinkButton from "@/components/header/link-button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useMediaQueries } from "@/hooks/use-media-queries";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import FilterForm from "@/components/header/filter-form";
import { UserButton } from "../auth/user-button";
import { SlidersHorizontal } from "lucide-react";

const titles: Map<string, string> = new Map([
  ["/", "Cupidr"],
  ["chat", "Chat"],
  ["account", "Account"],
  ["settings", "Settings"],
]);

export default function HeaderTitle() {
  const pathname = usePathname()?.split("/")[1];
  const currentPageTitle = titles.get(pathname || "/") || "Cupidr";
  const { sm } = useMediaQueries();
  const user = useCurrentUser();

  return (
    <section className="px-4 py-2 w-full h-12 flex justify-between items-center gap-8 md:order-3 md:justify-normal md:w-fit">
      <h1 className="text-3xl font-bold md:hidden">{currentPageTitle}</h1>
      <div
        className={`flex items-center 
					${currentPageTitle === "Account" || currentPageTitle === "Settings" ? "" : "hidden"} md:flex`}
      >
        <UserButton />
      </div>
      {user && !sm && (
        <Drawer>
          <DrawerTrigger
            className={`flex items-center ${currentPageTitle === "Chat" ? "" : "hidden"} md:flex`}
          >
            <SlidersHorizontal />
          </DrawerTrigger>
          <DrawerContent className="dark:bg-dark">
            <DrawerHeader>
              <DrawerTitle className="text-3xl">Filters</DrawerTitle>
            </DrawerHeader>
            <FilterForm />
          </DrawerContent>
        </Drawer>
      )}
      {user && sm && (
        <Dialog>
          <DialogTrigger
            className={`flex items-center ${currentPageTitle === "Chat" ? "" : "hidden"} md:flex`}
          >
            <SlidersHorizontal />
          </DialogTrigger>
          <DialogContent className="dark:bg-dark">
            <DialogHeader>
              <DialogTitle className="text-3xl text-center">
                Filters
              </DialogTitle>
              <DialogDescription>
                <FilterForm />
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )}
    </section>
  );
}
