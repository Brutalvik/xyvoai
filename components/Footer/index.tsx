"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { useLocale } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");
  const locale = useLocale();

  return (
    <footer className="w-full bg-background py-4 text-center text-sm text-gray-500">
      <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
        <span>{t("plain")}</span>
        <Link
          href={`/${locale}/legal/privacy`}
          className="underline hover:text-primary transition-colors"
        >
          {t("privacy")}
        </Link>
        <Link
          href={`/${locale}/legal/terms`}
          className="underline hover:text-primary transition-colors"
        >
          {t("terms")}
        </Link>
      </div>
    </footer>
  );
}
