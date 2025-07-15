"use client";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import _ from "lodash";

import { selectUser } from "@/store/selectors";
import { useAppSelector, useAppDispatch } from "@/store/hooks";

export default function ProfilePage() {
  const t = useTranslations("Profile");
  const activeUser: any = useAppSelector(selectUser);
  const router = useRouter();

  return (
    <div className="max-w-4xl w-full mx-auto py-12 px-4">
      <h1>Overview</h1>
    </div>
  );
}
