"use client";

import { MessageCircleMore } from "lucide-react";

export default function Default() {
  return (
    <div className="flex w-full h-full flex-col items-center justify-center">
      <MessageCircleMore size={48} />
      <h2 className="text-3xl">Choose chat</h2>
    </div>
  );
}
