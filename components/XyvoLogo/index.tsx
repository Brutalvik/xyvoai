"use client";

import { Logo } from "@/components/icons";

export default function XyvoLogo() {
  return (
    <div className="flex items-center gap-2">
      <Logo className="h-7 w-7 sm:h-8 sm:w-8 mr-0" />
      <span className="font-bold text-lg text-default-900 whitespace-nowrap">
        YVO
      </span>
    </div>
  );
}
