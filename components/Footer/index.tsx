"use client";

import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="w-full bg-background py-6 text-center text-sm text-gray-500">
      <div className="container mx-auto px-4">{t("plain")}</div>
    </footer>
  );
}
