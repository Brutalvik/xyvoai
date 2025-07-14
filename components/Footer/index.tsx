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
          className="underline hover:text-primary transition-colors"
          href={`/${locale}/legal/privacy`}
        >
          {t("privacy")}
        </Link>
        <Link
          className="underline hover:text-primary transition-colors"
          href={`/${locale}/legal/conditions`}
        >
          {t("conditions")}
        </Link>
      </div>
    </footer>
  );
}
