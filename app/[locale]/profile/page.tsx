"use client";

import { useAppSelector } from "@/store/hooks";
import { selectUser } from "@/store/selectors";
import { Card, CardHeader, CardBody, CardFooter, Button, Avatar, Chip } from "@heroui/react";
import { HiOutlinePencil, HiOutlineShieldCheck, HiOutlineCog, HiOutlineLogout } from "react-icons/hi";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import _ from "lodash";

export default function ProfilePage() {
  const t = useTranslations("Profile");
  const user = useAppSelector(selectUser);
  const router = useRouter();

  if (!user) {
    return <div className="p-8 text-center text-gray-500">{t("notLoggedIn")}</div>;
  }

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <Card className="mb-8 shadow-xl border-0">
        <CardHeader className="flex flex-col items-center gap-3 bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 rounded-t-lg p-8">
          <Avatar size="lg" src={user.image || undefined} name={user.name} className="ring-4 ring-white shadow-lg mb-2" />
          <h2 className="text-3xl font-bold text-white drop-shadow-lg">{user.name}</h2>
          <p className="text-lg text-white/80">{user.email}</p>
          <Chip color="primary" className="mt-2">{_.capitalize(user.role || "member")}</Chip>
        </CardHeader>
        <CardBody className="bg-white dark:bg-gray-950 rounded-b-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2 text-gray-800 dark:text-gray-100">{t("account")}</h3>
              <div className="space-y-2 text-gray-700 dark:text-gray-300">
                <div><strong>{t("organization")}</strong>: {user.organizationName || user.organizationId || t("noOrganization")}</div>
                <div><strong>{t("joined")}</strong>: {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "-"}</div>
                <div><strong>{t("status")}</strong>: <Chip color="success">{t("active")}</Chip></div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-gray-800 dark:text-gray-100">{t("permissions")}</h3>
              <ul className="space-y-2">
                {(user.permissions || []).map((perm: string) => (
                  <li key={perm} className="flex items-center gap-2 text-gray-700 dark:text-gray-200">
                    <HiOutlineShieldCheck className="text-green-500" />
                    <span>{perm}</span>
                  </li>
                ))}
                {(!user.permissions || user.permissions.length === 0) && (
                  <li className="text-gray-400">{t("noPermissions")}</li>
                )}
              </ul>
            </div>
          </div>
        </CardBody>
        <CardFooter className="flex justify-between items-center bg-gray-50 dark:bg-gray-900 rounded-b-lg p-4">
          <Button startContent={<HiOutlinePencil />} variant="bordered" onPress={() => router.push("/profile/edit")}>{t("editProfile")}</Button>
          <Button startContent={<HiOutlineCog />} variant="flat" onPress={() => router.push("/settings")}>{t("settings")}</Button>
          <Button startContent={<HiOutlineLogout />} color="danger" variant="solid" onPress={() => router.push("/logout")}>{t("logout")}</Button>
        </CardFooter>
      </Card>
      <Card className="shadow-lg border-0">
        <CardHeader className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-t-lg p-4">
          <h3 className="text-xl font-semibold text-white">{t("activitySummary")}</h3>
        </CardHeader>
        <CardBody className="bg-white dark:bg-gray-950 rounded-b-lg">
          <p className="text-gray-600 dark:text-gray-400">{t("activityComingSoon")}</p>
        </CardBody>
      </Card>
    </div>
  );
}
