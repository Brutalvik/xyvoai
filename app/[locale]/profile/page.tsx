"use client";

import UserProfile from "@/components/UserProfile";
import { useAppSelector } from "@/store/hooks";
import { isLoggedIn } from "@/store/selectors";

export default function ProfilePage() {
  const loggedIn = useAppSelector(isLoggedIn);

  if (!loggedIn) {
    return null;
  }

  return <UserProfile />;
}
