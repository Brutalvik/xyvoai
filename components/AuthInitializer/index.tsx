"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/store/hooks";
import { refreshSession } from "@/store/slices/authSlice";

export default function AuthInitializer() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(refreshSession());
  }, [dispatch]);

  return null;
}
