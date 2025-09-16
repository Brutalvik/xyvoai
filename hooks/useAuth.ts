// hooks/useAuth.ts
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectUser } from "@/store/selectors";
import { signoutThunk } from "@/store/auth/thunks";
import { decodeToken } from "@/lib/utils";

function getToken() {
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith("x-token="))
    ?.split("=")[1];
}

export function useAuth() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const activeUser: any = useAppSelector(selectUser);
  const { user } = activeUser || {};
  const [isAdmin, setIsAdmin] = useState(false);

  // auto logout & admin flag
  useEffect(() => {
    const token = getToken();
    if (!token) {
      setIsAdmin(false);
      return;
    }

    try {
      const decoded: any = decodeToken(token);

      // admin flag
      setIsAdmin(decoded?.permissions?.includes("admin:full") ?? false);

      // handle expiry
      if (decoded?.exp) {
        const msUntilExpiry = decoded.exp * 1000 - Date.now();
        if (msUntilExpiry <= 0) {
          autoLogout();
        } else {
          const timer = setTimeout(autoLogout, msUntilExpiry);
          return () => clearTimeout(timer);
        }
      }
    } catch {
      autoLogout();
    }

    function autoLogout() {
      dispatch(signoutThunk());
      router.push("/auth/signin");
    }
  }, [dispatch, router]);

  return { user, isAdmin };
}
