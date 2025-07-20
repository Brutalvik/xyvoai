"use client";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
  Chip,
  useDisclosure,
  addToast,
} from "@heroui/react";
import { Settings2 } from "lucide-react";
import _ from "lodash";
import { useTranslations } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectUser } from "@/store/selectors";
import { signoutThunk } from "@/store/auth/thunks";
import {
  HiBadgeCheck,
  HiExclamationCircle,
  HiInformationCircle,
  HiUserCircle,
} from "react-icons/hi";
import LanguageSwitch from "@/components/LanguageSwitch";
import VerificationCodeModal from "@/components/Auth/VerificationCodeModal";
import { ThemeSwitch } from "@/components/theme-switch";
import { drawerNavItems } from "@/components/Navbar/DrawerNavItems";
import Link from "next/link";
import clsx from "clsx";
import {
  resendVerificationCodeThunk,
  verifyCodeThunk,
} from "@/store/auth/verifyCodeThunk";

interface UserDrawerProps {
  isOpen: boolean;
  onOpenChange: () => void;
}

export default function UserDrawer({ isOpen, onOpenChange }: UserDrawerProps) {
  const t = useTranslations("Navbar");
  const router = useRouter();
  const dispatch = useAppDispatch();
  const activeUser: any = useAppSelector(selectUser);
  const { user } = activeUser || {};
  const firstName = user?.name?.split(" ")[0];
  const verificationModal = useDisclosure();
  const pathname = usePathname();

  const handleVerify = async (code: string) => {
    try {
      const status = await dispatch(
        verifyCodeThunk({ email: user?.email, code })
      ).unwrap();

      if (status === 200) {
        addToast({
          title: t("verifiedToast.title"),
          description: t("verifiedToast.description"),
          color: "success",
          icon: <HiBadgeCheck />,
        });

        verificationModal.onClose();
      }
    } catch (err: any) {
      addToast({
        title: t("errorToast.title"),
        description: err.message || t("verifiedToast.error"),
        color: "danger",
      });
    }
  };

  const handleResendCode = async () => {
    try {
      const response = await dispatch(
        resendVerificationCodeThunk({ email: user?.email })
      ).unwrap();
      console.log(response);

      addToast({
        title: t("resendToast.title"),
        description: t("resendToast.description"),
        color: "primary",
        icon: <HiUserCircle />,
      });
    } catch (err: any) {
      console.log(err);
      if (err.response.status === 409) {
        addToast({
          title: t("resendToast.rateLimitErrorTitle"),
          description: t("resendToast.rateLimitError"),
          color: "danger",
          icon: <HiExclamationCircle />,
        });
      } else {
        addToast({
          title: t("resendToast.errorTitle"),
          description: err.message || t("resendToast.errorDescription"),
          color: "danger",
          icon: <HiUserCircle />,
        });
      }
    }
  };

  return (
    <>
      <Drawer isOpen={isOpen} placement="right" onOpenChange={onOpenChange}>
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerHeader className="flex flex-col gap-2">
                <div className="flex items-start justify-between">
                  <div className="flex flex-col">
                    <p>
                      {t("welcome")} {_.capitalize(firstName)}
                    </p>
                    {String(user?.emailVerified) !== "true" ? (
                      <div className="flex items-center gap-2 mt-1">
                        <Chip color="warning" variant="flat" size="sm">
                          {t("unverified")}
                        </Chip>
                        <Button
                          size="sm"
                          variant="light"
                          color="primary"
                          className="p-0 h-auto text-sm hover:underline"
                          onPress={verificationModal.onOpen}
                        >
                          {t("verify")}
                        </Button>
                      </div>
                    ) : null}
                    <p className="text-sm text-gray-500 mt-1">
                      {_.capitalize(t(user?.role ?? "individual"))}
                    </p>
                  </div>
                  <div className="flex items-center gap-10 mr-10 block">
                    <LanguageSwitch />
                    <ThemeSwitch />
                  </div>
                </div>
              </DrawerHeader>

              <DrawerBody>
                <div className="flex flex-col gap-2 px-1">
                  {drawerNavItems.map(({ title, icon: Icon, path, badge }) => {
                    const isActive = pathname === path;

                    return (
                      <Link
                        key={title}
                        href={path}
                        onClick={onClose}
                        className={clsx(
                          "flex items-center justify-between px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors",
                          isActive && "bg-gray-100 dark:bg-neutral-800"
                        )}
                      >
                        <div className="flex items-center gap-2 text-sm text-neutral-800 dark:text-neutral-200">
                          <Icon size={18} />
                          <span>{title}</span>
                        </div>
                        {badge && (
                          <span className="ml-auto text-xs px-2 py-0.5 rounded bg-blue-500 text-white">
                            {badge}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </DrawerBody>

              <DrawerFooter className="flex items-end justify-between">
                <div className="flex items-center">
                  <button
                    className="flex items-center gap-2 text-gray-700 dark:text-gray-100 text-base font-medium hover:underline focus:outline-none"
                    type="button"
                    onClick={() => {
                      router.push(`/profile`);
                      onClose();
                    }}
                  >
                    <Settings2 className="w-5 h-5" />
                    {t("profile")}
                  </button>
                </div>
                <Button
                  color="danger"
                  variant="solid"
                  onPress={async () => {
                    await dispatch(signoutThunk());
                    router.push("/");
                    addToast({
                      title: t("signedOutTitle"),
                      description: t("signedOutDescription"),
                      color: "success",
                      icon: <HiInformationCircle />,
                    });
                    onClose();
                  }}
                >
                  {t("signOut")}
                </Button>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>

      {user && (
        <VerificationCodeModal
          isOpen={verificationModal.isOpen}
          onClose={verificationModal.onClose}
          email={user.email}
          onVerify={handleVerify}
          onResendCode={handleResendCode}
        />
      )}
    </>
  );
}
