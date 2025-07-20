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
} from "@heroui/react";
import { Settings2 } from "lucide-react";
import _ from "lodash";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectUser } from "@/store/selectors";
import { signoutThunk } from "@/store/auth/thunks";
import { addToast } from "@heroui/react";
import { HiInformationCircle } from "react-icons/hi";
import LanguageSwitch from "@/components/LanguageSwitch";
import VerificationCodeModal from "@/components/Auth/VerificationCodeModal";
import { ThemeSwitch } from "@/components/theme-switch";

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

  const handleVerify = async (code: string) => {
    // This is a placeholder. In a real app, you would dispatch a thunk
    // to your backend to verify the code.
    console.log(`Verifying ${user?.email} with code: ${code}`);
    // Example: await dispatch(verifyEmailThunk({ email: user?.email, code }));
    addToast({
      title: "Verification Successful",
      description: "Your email has been verified.",
      color: "success",
      icon: <HiInformationCircle />,
    });
    verificationModal.onClose();
    // You might want to re-fetch user data here to update the UI
  };

  const handleResendCode = async () => {
    // This is a placeholder. In a real app, you would dispatch a thunk
    // to your backend to resend the verification code.
    console.log(`Resending verification code to ${user?.email}`);
    // Example: await dispatch(resendVerificationCodeThunk({ email: user?.email }));
    addToast({
      title: "Code Sent",
      description: "A new verification code has been sent to your email.",
      color: "primary",
      icon: <HiInformationCircle />,
    });
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

              <DrawerBody>{/* Future drawer content */}</DrawerBody>

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
