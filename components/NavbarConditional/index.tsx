"use client";

import { useAppSelector } from "@/store/hooks";
import { isLoggedIn } from "@/store/selectors";
import Navbar from "@/components/Navbar";
import { BoardHeader } from "@/components/Overview/Kanban/BoardHeader";
import { usePathname } from "next/navigation";

export default function NavbarConditional() {
  const loggedIn = useAppSelector(isLoggedIn);
  const pathname = usePathname();

  const isHomePage = pathname === "/en" || pathname === "/fr";

  if (!loggedIn || isHomePage) return <Navbar />;

  return <BoardHeader />;
}
