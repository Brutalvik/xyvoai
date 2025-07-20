"use client";

import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import _ from "lodash";
import { useState } from "react";
import {
  Card,
  Button,
  Avatar,
  Chip,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Input,
  Tooltip,
} from "@heroui/react";
import {
  HiOutlineShieldCheck,
  HiOutlineKey,
  HiOutlineUser,
  HiOutlineClock,
  HiOutlineMail,
  HiOutlinePhone,
} from "react-icons/hi";
import {
  HiOutlineBuildingOffice2,
  HiOutlineCalendarDays,
} from "react-icons/hi2";
import { LogOut } from "lucide-react";

import { selectUser } from "@/store/selectors";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { signoutThunk } from "@/store/auth/thunks";
import { formatPhoneNumber } from "@/utils";

export default function ProfilePage() {
  const t = useTranslations("Profile");
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [showPasswordResetModal, setShowPasswordResetModal] = useState(false);
  const { user }: any = useAppSelector(selectUser);
  const uniquePermissions: string[] = Array.from(
    new Set(user.permissions as string[])
  );

  console.log(user);

  if (!user) {
    return (
      <div className="p-8 text-center text-gray-500">{t("notLoggedIn")}</div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-10 px-4 min-h-screen bg-gradient-to-b from-white to-neutral-100 dark:from-neutral-900 dark:to-neutral-950">
      <Card className="w-full max-w-2xl shadow-xl rounded-2xl border border-neutral-200 dark:border-neutral-700">
        <div className="bg-gradient-to-br from-[#0f172a] to-[#2563eb] rounded-t-2xl text-white px-8 py-10 text-center">
          <div className="flex flex-col items-center gap-4">
            <Avatar
              size="lg"
              className="ring-2 ring-white shadow-md cursor-pointer"
              name={user.name}
              src={user.image}
            />
            <div>
              <h2 className="text-2xl font-bold">
                {_.capitalize(user.firstName)} {_.capitalize(user.lastName)}
              </h2>
              <p className="text-sm text-white/80">{user.email}</p>
            </div>
            <Chip className="text-sm px-3 py-1" color="primary">
              {_.capitalize(user.role)}
            </Chip>
          </div>
        </div>

        <div className="bg-white dark:bg-neutral-950 px-8 py-6 rounded-b-2xl space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="text-base font-semibold text-gray-800 dark:text-gray-200">
                {t("account")}
              </h3>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li>
                  <Tooltip content={t("email")}>
                    <HiOutlineMail className="inline mr-2 cursor-pointer" />
                  </Tooltip>
                  {user.email}
                </li>
                <li>
                  <Tooltip content={t("phone")}>
                    <HiOutlinePhone className="inline mr-2 cursor-pointer" />
                  </Tooltip>
                  {formatPhoneNumber(user.phone)}
                </li>
                <li>
                  <Tooltip content={t("accountType")}>
                    <HiOutlineUser className="inline mr-2 cursor-pointer" />
                  </Tooltip>
                  {_.capitalize(user.accountType)}
                </li>
                <li>
                  <Tooltip content={t("organization")}>
                    <HiOutlineBuildingOffice2 className="inline mr-2 cursor-pointer" />
                  </Tooltip>
                  {user.organizationName}
                </li>
                <li>
                  <Tooltip content={t("timezone")}>
                    <HiOutlineClock className="inline mr-2 cursor-pointer" />
                  </Tooltip>
                  {user.timezone}
                </li>
                <li>
                  <Tooltip content={t("lastLogin")}>
                    <HiOutlineCalendarDays className="inline mr-2 cursor-pointer" />
                  </Tooltip>
                  {user?.lastLogin
                    ? new Date(user.lastLogin).toLocaleString()
                    : t("noLastLogin")}
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-base font-semibold text-gray-800 dark:text-gray-200">
                {t("permissions")}
              </h3>
              {user.permissions?.length ? (
                <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300">
                  {uniquePermissions.map((perm) => (
                    <li key={perm} className="flex items-center gap-2">
                      <HiOutlineShieldCheck className="text-green-500" />
                      <span>
                        {t(`permissions_${perm.replace(/[:.]/g, "_")}`) !==
                        `permissions_${perm.replace(/[:.]/g, "_")}`
                          ? t(`permissions_${perm.replace(/[:.]/g, "_")}`)
                          : perm}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-400 text-sm">{t("noPermissions")}</p>
              )}
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3 pt-6 border-t border-neutral-200 dark:border-neutral-700">
            <Button
              startContent={<HiOutlineKey />}
              variant="flat"
              onPress={() => setShowPasswordResetModal(true)}
            >
              {t("resetPassword")}
            </Button>
            <Button
              startContent={<LogOut size={18} />}
              color="danger"
              onPress={async () => {
                await dispatch(signoutThunk());
                router.replace("/");
              }}
            >
              {t("logout")}
            </Button>
          </div>
        </div>
      </Card>

      {/* Reset Password Modal */}
      <Modal
        isOpen={showPasswordResetModal}
        onClose={() => setShowPasswordResetModal(false)}
      >
        <ModalContent>
          <ModalHeader>{t("resetPassword")}</ModalHeader>
          <ModalBody>
            <p className="text-sm text-gray-500 mb-2">
              {t("resetPasswordDescription")}
            </p>
            <Input
              disabled
              label={t("email")}
              placeholder={user.email}
              type="email"
            />
            <Button
              color="primary"
              variant="solid"
              onPress={() => console.log("Reset password")}
              className="mt-3"
            >
              {t("resetPassword")}
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}
