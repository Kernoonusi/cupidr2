"use client";

import { LogOut, User, Settings, ChevronDown, Palette } from "lucide-react";
import Link from "next/link";
import { signOut } from "next-auth/react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useCurrentUser } from "@/hooks/use-current-user";
import { ThemeSelect } from "@/components/theme-select";

export const UserButton = () => {
  const user = useCurrentUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center space-x-2">
        <Avatar>
          <AvatarImage src={user?.image || ""} alt="User avatar" />
          <AvatarFallback className="bg-emerald-500">
            <User className="text-white" />
          </AvatarFallback>
        </Avatar>
        <ChevronDown className="w-4 h-4 text-black dark:text-white" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>
          <div className="flex justify-center items-center space-x-2">
            <Avatar>
              <AvatarImage src={user?.image || ""} alt="User avatar" />
              <AvatarFallback className="bg-emerald-500">
                <User className="text-white" />
              </AvatarFallback>
            </Avatar>
            <div>
              <p>{user?.name}</p>
              <p className="text-xs text-slate-400">{user?.email}</p>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuItem asChild>
          <Link href="/settings" className="w-full">
            <div className="flex">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </div>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuLabel className="flex items-center space-x-4">
          <div className="flex items-center">
            <Palette className="w-4 h-4 mr-2" />
            Theme:
          </div>
          <ThemeSelect />
        </DropdownMenuLabel>
        <DropdownMenuItem
          className="cursor-pointer bg-destructive/15"
          onClick={() => signOut()}
        >
          <LogOut className="w-4 h-4 mr-2 text-destructive" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
