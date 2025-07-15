"use client";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import _ from "lodash";
import { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Avatar,
  Chip,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Input,
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
import { LogOut, Settings2 } from "lucide-react";

import { selectUser } from "@/store/selectors";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { signoutThunk } from "@/store/auth/thunks";

export default function ProfilePage() {
  const t = useTranslations("Profile");
  const activeUser: any = useAppSelector(selectUser);
  const router = useRouter();
  const [showPasswordResetModal, setShowPasswordResetModal] = useState(false);
  const [showAllPermissionsModal, setShowAllPermissionsModal] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const dispatch = useAppDispatch();
  const { user } = activeUser ? activeUser : { user: null };

  if (!user) {
    return (
      <div className="p-8 text-center text-gray-500">{t("notLoggedIn")}</div>
    );
  }

  const groupedPermissions = _.groupBy(
    user.permissions,
    (perm) => perm.split(".")[0]
  );

  return (
    <div className="max-w-4xl w-full mx-auto py-12 px-4">
      <Card className="mb-8 shadow-xl border-0">
        <CardHeader className="flex flex-col items-center gap-3 rounded-t-lg p-8">
          {/* Xyvo AI Logo/Name and Avatar at the top */}
          <div className="flex flex-col items-center w-full mb-4">
            {/* Replace below with your logo if available, else keep text */}
            <span className="text-3xl font-extrabold text-primary-600 tracking-tight mb-2">
              Xyvo{" "}
              <span className="text-green-400 bg-green-100 rounded px-2 py-0.5 text-lg align-middle">
                AI
              </span>
            </span>
            <Avatar
              className="ring-4 ring-white shadow-lg mb-2"
              name={user.name}
              size="lg"
              {...(user.image ? { src: user.image } : {})}
            />
          </div>
          {/* Action buttons below avatar */}
          <div className="w-full flex flex-wrap justify-center gap-2 mb-4">
            <Button
              startContent={<HiOutlineUser />}
              variant="bordered"
              onPress={() => {
                setShowSettings(false);
                router.push("/profile/edit");
              }}
            >
              {t("editProfile")}
            </Button>
            <Button
              startContent={<Settings2 />}
              variant={showSettings ? "solid" : "flat"}
              onPress={() => setShowSettings(true)}
            >
              {t("settings")}
            </Button>
            <Button
              startContent={<HiOutlineKey />}
              variant="flat"
              onPress={() => {
                setShowSettings(false);
                setShowPasswordResetModal(true);
              }}
            >
              {t("resetPassword")}
            </Button>
            <Button
              color="danger"
              startContent={<LogOut size={18} />}
              variant="solid"
              onPress={async () => {
                setShowSettings(false);
                await dispatch(signoutThunk());
                router.replace("/");
              }}
            >
              {t("logout")}
            </Button>
          </div>
          <h2 className="text-3xl font-bold text-white drop-shadow-lg">
            {user.name}
          </h2>
          <p className="text-lg text-white/80">{user.email}</p>
          <Chip className="mt-2" color="primary">
            {_.capitalize(user.role || "member")}
          </Chip>
        </CardHeader>
        <CardBody className="bg-white dark:bg-gray-950 rounded-b-lg">
          {showSettings ? (
            <div className="flex flex-col items-center justify-center min-h-[200px]">
              <Settings2 className="w-10 h-10 mb-2 text-gray-400" />
              <h3 className="text-xl font-semibold mb-2">{t("settings")}</h3>
              <p className="text-gray-500">
                {t("settingsComingSoon") ||
                  "Settings management will be available soon."}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2 text-gray-800 dark:text-gray-100">
                  {t("account")}
                </h3>
                <div className="space-y-2 text-gray-700 dark:text-gray-300">
                  <div>
                    <HiOutlineMail className="inline mr-1" />{" "}
                    <strong>{t("email")}</strong>: {user.email}
                  </div>
                  <div>
                    <HiOutlinePhone className="inline mr-1" />{" "}
                    <strong>{t("phone")}</strong>: {user.phone || "-"}
                  </div>
                  <div>
                    <HiOutlineUser className="inline mr-1" />{" "}
                    <strong>{t("accountType")}</strong>:{" "}
                    {_.capitalize(user.accountType || "-")}
                  </div>
                  <div>
                    <HiOutlineBuildingOffice2 className="inline mr-1" />{" "}
                    <strong>{t("organization")}</strong>:{" "}
                    {user.organizationName ||
                      user.organizationId ||
                      t("noOrganization")}
                  </div>
                  <div>
                    <HiOutlineClock className="inline mr-1" />{" "}
                    <strong>{t("timezone")}</strong>: {user.timezone || "UTC"}
                  </div>
                  <div>
                    <HiOutlineShieldCheck className="inline mr-1" />{" "}
                    <strong>{t("status")}</strong>:{" "}
                    <Chip
                      color={user.status === "active" ? "success" : "danger"}
                    >
                      {t(user.status)}
                    </Chip>
                  </div>
                  <div>
                    <HiOutlineCalendarDays className="inline mr-1" />{" "}
                    <strong>{t("lastLogin")}</strong>:{" "}
                    {user.lastLogin
                      ? new Date(user.lastLogin).toLocaleString()
                      : t("noLastLogin")}
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-gray-800 dark:text-gray-100">
                  {t("permissions")}
                </h3>
                {(() => {
                  const uniquePerms = [...new Set(user.permissions)];
                  const maxVisible = 6;

                  if (uniquePerms.length === 0) {
                    return (
                      <p className="text-gray-400">{t("noPermissions")}</p>
                    );
                  }

                  return (
                    <>
                      <ul className="space-y-2">
                        {uniquePerms.slice(0, maxVisible).map((perm) => {
                          const permStr = String(perm);
                          const permKey = permStr.replace(/[:.]/g, "_");

                          return (
                            <li
                              key={permStr}
                              className="flex items-center gap-2"
                            >
                              <HiOutlineShieldCheck className="text-green-500" />
                              <span>
                                {t(`permissions_${permKey}`) !==
                                `permissions_${permKey}`
                                  ? t(`permissions_${permKey}`)
                                  : permStr}
                              </span>
                            </li>
                          );
                        })}
                      </ul>
                      {uniquePerms.length > maxVisible && (
                        <button
                          className="ml-2 text-blue-600 hover:underline text-sm"
                          type="button"
                          onClick={() => setShowAllPermissionsModal(true)}
                        >
                          ...more
                        </button>
                      )}
                    </>
                  );
                })()}
                <Modal
                  isOpen={showAllPermissionsModal}
                  onClose={() => setShowAllPermissionsModal(false)}
                >
                  <ModalContent className="max-h-[90vh] w-full md:w-[600px]">
                    <ModalHeader>{t("permissions")}</ModalHeader>
                    <ModalBody>
                      <div className="max-h-[60vh] overflow-y-auto">
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {[...new Set(user.permissions)].map((perm) => {
                            const permStr = String(perm);
                            const permKey = permStr.replace(/[:.]/g, "_");

                            return (
                              <li
                                key={permStr}
                                className="flex items-center gap-2"
                              >
                                <HiOutlineShieldCheck className="text-green-500" />
                                <span>
                                  {t(`permissions_${permKey}`) !==
                                  `permissions_${permKey}`
                                    ? t(`permissions_${permKey}`)
                                    : permStr}
                                </span>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </ModalBody>
                    <CardFooter className="justify-end">
                      <Button onPress={() => setShowAllPermissionsModal(false)}>
                        {t("close") || "Close"}
                      </Button>
                    </CardFooter>
                  </ModalContent>
                </Modal>
              </div>
            </div>
          )}
        </CardBody>
      </Card>
      <Modal
        isOpen={showPasswordResetModal}
        onClose={() => setShowPasswordResetModal(false)}
      >
        <ModalContent>
          <ModalHeader>{t("resetPassword")}</ModalHeader>
          <ModalBody>
            <p>{t("resetPasswordDescription")}</p>
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
            >
              {t("resetPassword")}
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}
