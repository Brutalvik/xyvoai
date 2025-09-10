// app/[locale]/notifications/create/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { selectUser } from "@/store/selectors";
import { fetchUserPermissions } from "@/store/slices/permissionsSlice";
import NotificationPageComponent from "@/components/Admin/NotificationPageComponent";

export default function NotificationCreatePage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user }: any = useAppSelector(selectUser);

  const [permissions, setPermissions] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch user permissions once per user
  useEffect(() => {
    if (!user?.id) return;

    let cancelled = false;

    const fetchPermissions = async () => {
      try {
        const res: any = await dispatch(fetchUserPermissions(user.id));
        if (!cancelled && res.payload?.permissions) {
          const perms = res.payload.permissions.map((p: any) =>
            typeof p === "string" ? p : p?.permission || ""
          );
          setPermissions(Array.from(new Set(perms)));
        }
      } catch {
        if (!cancelled) setPermissions([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchPermissions();
    return () => {
      cancelled = true;
    };
  }, [user?.id, dispatch]);

  if (!user || loading) return null;

  return (
    <NotificationPageComponent
      userPermissions={permissions}
      onSuccessRedirect={() => router.push("/notifications")}
    />
  );
}
