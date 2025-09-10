"use client";

import { Button, Card } from "@heroui/react";
import { useRouter } from "next/navigation";
import { HiExclamationCircle } from "react-icons/hi";
import { useTranslations } from "next-intl";

export default function Unauthorized() {
  const router = useRouter();
  const t = useTranslations("Unauthorized");

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-neutral-900 p-4">
      <Card className="flex flex-col items-center justify-center gap-4 p-10 max-w-md w-full text-center border border-neutral-300 dark:border-neutral-700 shadow-xl rounded-2xl bg-white dark:bg-neutral-950">
        <HiExclamationCircle className="w-16 h-16 text-red-500" />
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
          {t("title") || "Unauthorized"}
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {t("message") || "You do not have permission to access this page."}
        </p>
        <div className="flex gap-3 mt-4">
          <Button color="primary" onPress={() => router.push("/")}>
            {t("goHome") || "Go Home"}
          </Button>
          <Button
            variant="flat"
            color="secondary"
            onPress={() => router.back()}
          >
            {t("goBack") || "Go Back"}
          </Button>
        </div>
      </Card>
    </div>
  );
}
