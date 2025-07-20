"use client";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
  Chip,
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

  console.log(user);

  return (
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
                  {String(user?.emailVerified) !== "true" && (
                    <Chip color="warning" variant="flat" size="sm">
                      {t("unverified")}
                    </Chip>
                  )}
                  <p className="text-sm text-gray-500">
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
  );
}
