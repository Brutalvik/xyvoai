"use client";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import _ from "lodash";

import { selectUser } from "@/store/selectors";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { BoardLayout } from "@/components/Overview/BoardLayout";

export default function ProfilePage() {
  const t = useTranslations("Profile");
  const activeUser: any = useAppSelector(selectUser);
  const router = useRouter();

  return (
    <BoardLayout>
      <h1>Overview</h1>
    </BoardLayout>
  );
}
