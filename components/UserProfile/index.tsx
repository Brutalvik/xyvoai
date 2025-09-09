"use client";

import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import _ from "lodash";
import { useState, useEffect } from "react";
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
  HiOutlineUser,
  HiOutlineClock,
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineKey,
  HiOutlineUserCircle,
} from "react-icons/hi";
import {
  HiOutlineBuildingOffice2,
  HiOutlineCalendarDays,
} from "react-icons/hi2";
import { LogOut } from "lucide-react";
import { FiCopy, FiCheckSquare } from "react-icons/fi";

import { selectUser } from "@/store/selectors";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { signoutThunk } from "@/store/auth/thunks";
import { fetchUserPermissions } from "@/store/slices/permissionsSlice";
import { formatPhoneNumber } from "@/utils";
import { formattedDate } from "@/components/UserProfile/helper";

// Truncated ID with copy button
function TruncatedId({ id }: { id: string }) {
  const [copied, setCopied] = useState(false);
  const truncated = `${id.slice(0, 4)}...${id.slice(-4)}`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Tooltip content={id}>
      <span className="flex items-center gap-1">
        {truncated}
        <button
          onClick={handleCopy}
          className="p-1 rounded hover:bg-gray-200 dark:hover:bg-neutral-700 transition"
          title="Copy full ID"
        >
          {copied ? (
            <FiCheckSquare className="w-4 h-4 text-green-500" />
          ) : (
            <FiCopy className="w-4 h-4" />
          )}
        </button>
      </span>
    </Tooltip>
  );
}

export default function ProfilePage() {
  const t = useTranslations("Profile");
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user }: any = useAppSelector(selectUser);

  console.log("User data:", user);

  const [permissions, setPermissions] = useState<string[]>([]);
  const [showPasswordResetModal, setShowPasswordResetModal] = useState(false);

  // Fetch permissions on mount and whenever user ID changes
  useEffect(() => {
    if (user?.id) {
      dispatch(fetchUserPermissions(user.id)).then((res: any) => {
        if (res.payload?.permissions) {
          setPermissions(res.payload.permissions);
        }
      });
    }
  }, [user?.id, dispatch]);

  // Unique permissions for display
  const uniquePermissions: string[] = Array.from(new Set(permissions));

  return (
    <div className="flex flex-col items-center justify-center py-10 px-4 min-h-screen bg-gradient-to-b from-white to-neutral-100 dark:from-neutral-900 dark:to-neutral-950">
      <Card className="w-full max-w-2xl shadow-xl rounded-2xl border border-neutral-200 dark:border-neutral-700">
        <div className="bg-gradient-to-br from-[#0f172a] to-[#2563eb] rounded-t-2xl text-white px-8 py-10 text-center">
          <div className="flex flex-col items-center gap-4">
            <Avatar
              size="lg"
              className="ring-2 ring-white shadow-md cursor-pointer"
              name={user?.name?.toUpperCase()}
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
            {/* Account Info */}
            <div className="space-y-3">
              <h3 className="text-base font-semibold text-gray-800 dark:text-gray-200">
                {t("account")}
              </h3>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li className="flex items-center gap-2">
                  <Tooltip content={t("email")}>
                    <HiOutlineMail className="cursor-pointer" />
                  </Tooltip>
                  {user.email}
                </li>
                <li className="flex items-center gap-2">
                  <Tooltip content={"User ID"}>
                    <HiOutlineUserCircle className="cursor-pointer" />
                  </Tooltip>
                  <TruncatedId id={user.id} />
                </li>
                <li className="flex items-center gap-2">
                  <Tooltip content={t("phone")}>
                    <HiOutlinePhone className="cursor-pointer" />
                  </Tooltip>
                  {formatPhoneNumber(user.phone)}
                </li>
                <li className="flex items-center gap-2">
                  <Tooltip content={t("accountType")}>
                    <HiOutlineUser className="cursor-pointer" />
                  </Tooltip>
                  {_.capitalize(user.accountType)}
                </li>
                <li className="flex items-center gap-2">
                  <Tooltip content={t("organization")}>
                    <HiOutlineBuildingOffice2 className="cursor-pointer" />
                  </Tooltip>
                  {user.organizationName}
                </li>
                <li className="flex items-center gap-2">
                  <Tooltip content={"Organization ID"}>
                    <HiOutlineBuildingOffice2 className="cursor-pointer" />
                  </Tooltip>
                  <TruncatedId id={user?.organizationId} />
                </li>
                <li className="flex items-center gap-2">
                  <Tooltip content={t("timezone")}>
                    <HiOutlineClock className="cursor-pointer" />
                  </Tooltip>
                  {user.timezone}
                </li>
                <li className="flex items-center gap-2">
                  <Tooltip content={t("lastLogin")}>
                    <HiOutlineCalendarDays className="cursor-pointer" />
                  </Tooltip>
                  {user?.lastLogin
                    ? formattedDate(new Date(user.lastLogin))
                    : t("noLastLogin")}
                </li>
              </ul>
            </div>

            {/* Permissions */}
            <div className="space-y-3">
              <h3 className="text-base font-semibold text-gray-800 dark:text-gray-200">
                {t("permissions")}
              </h3>
              {permissions?.length ? (
                <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300">
                  {uniquePermissions.map((permObj: any) => {
                    // permObj can be string or { permission: string, ... }
                    const permStr =
                      typeof permObj === "string"
                        ? permObj
                        : permObj.permission;

                    return (
                      <li key={permStr} className="flex items-center gap-2">
                        <HiOutlineShieldCheck className="text-green-500" />
                        <span>
                          {t(`permissions_${permStr.replace(/[:.]/g, "_")}`) !==
                          `permissions_${permStr.replace(/[:.]/g, "_")}`
                            ? t(`permissions_${permStr.replace(/[:.]/g, "_")}`)
                            : permStr}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p className="text-gray-400 text-sm">{t("noPermissions")}</p>
              )}
            </div>
          </div>

          {/* Actions */}
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
            <Button color="primary" variant="solid" className="mt-3">
              {t("resetPassword")}
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}
