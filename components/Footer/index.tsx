"use client";

import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="w-full border-t border-gray-800 bg-[#0B0F11] py-6 text-center text-sm text-gray-400">
      <div className="container mx-auto px-4">{t("plain")}</div>
    </footer>
  );
}
