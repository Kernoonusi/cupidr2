'use client';

import { LogOut, User, Settings } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useCurrentUser } from '@/hooks/use-current-user';
import { signOut } from 'next-auth/react';
import Link from 'next/link';

export const UserButton = () => {
  const user = useCurrentUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center space-x-4">
        {/* <p className="font-mono text-lg">{user?.name}</p> */}
        <Avatar>
          <AvatarImage src={user?.image || ''} alt="User avatar" />
          <AvatarFallback className="bg-emerald-500">
            <User className="text-white" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          <Link href="/settings">
            <div className="flex">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </div>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer" onClick={() => signOut()}>
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
