"use client";

import { useAppSelector } from "@/store/hooks";
import { isLoggedIn } from "@/store/selectors";
import Navbar from "@/components/Navbar";

export default function NavbarConditional() {
  const loggedIn = useAppSelector(isLoggedIn);

  if (loggedIn) return null;
  return <Navbar />;
}
