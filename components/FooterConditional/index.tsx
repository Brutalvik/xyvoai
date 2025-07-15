"use client";

import { useAppSelector } from "@/store/hooks";
import { isLoggedIn } from "@/store/selectors";
import Footer from "@/components/Footer";

export default function FooterConditional() {
  const loggedIn = useAppSelector(isLoggedIn);

  if (loggedIn) return null;
  return <Footer />;
}
