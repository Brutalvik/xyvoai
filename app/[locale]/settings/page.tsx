"use client";

import { Card, CardHeader, CardBody } from "@heroui/react";
import { useTranslations } from "next-intl";

export default function SettingsPage() {
  const t = useTranslations("Settings");

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <Card className="shadow-xl border-0">
        <CardHeader className="rounded-t-lg p-6">
          <h2 className="text-2xl font-bold">{t("settings")}</h2>
        </CardHeader>
        <CardBody className="rounded-b-lg">
          <p className="text-gray-600 dark:text-gray-400">
            {t("settingsComingSoon")}
          </p>
        </CardBody>
      </Card>
    </div>
  );
}
