"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { useLocale } from "next-intl";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Logo } from "@/components/icons";

export default function Footer() {
  const t = useTranslations("footer");
  const locale = useLocale();

  return (
    <motion.footer
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-[#0e101a] text-sm text-gray-400 w-full"
    >
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {/* Logo + Tagline */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 flex mr-">
              <Logo />
            </div>
            <span className="text-default font-semibold text-base">yvo</span>
          </div>
          <p className="text-default-500 text-sm leading-relaxed">
            {t("tagline")}
          </p>
          <div className="flex gap-4 mt-4 text-xl text-default-500">
            <a
              href="https://github.com"
              aria-label="GitHub"
              className="hover:text-white transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub />
            </a>
            <a
              href="https://linkedin.com"
              aria-label="LinkedIn"
              className="hover:text-white transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://twitter.com"
              aria-label="Twitter"
              className="hover:text-white transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter />
            </a>
          </div>
        </div>

        {/* Product */}
        <div>
          <h3 className="text-default-500 font-semibold mb-2">
            {t("product.title")}
          </h3>
          <ul className="space-y-1">
            <li>
              <Link
                href={`/${locale}#features`}
                className="hover:text-white transition-colors"
              >
                {t("product.features")}
              </Link>
            </li>
            <li>
              <Link
                href={`/${locale}/pricing`}
                className="hover:text-white transition-colors"
              >
                {t("product.pricing")}
              </Link>
            </li>
            <li>
              <Link
                href={`/${locale}/integrations`}
                className="hover:text-white transition-colors"
              >
                {t("product.integrations")}
              </Link>
            </li>
            <li>
              <Link
                href={`/${locale}/api`}
                className="hover:text-white transition-colors"
              >
                {t("product.api")}
              </Link>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="text-default-500 font-semibold mb-2">
            {t("legal.title")}
          </h3>
          <ul className="space-y-1">
            <li>
              <Link
                href={`/${locale}/legal/privacy`}
                className="hover:text-default-500 transition-colors"
              >
                {t("legal.privacy")}
              </Link>
            </li>
            <li>
              <Link
                href={`/${locale}/legal/conditions`}
                className="hover:text-default-500 transition-colors"
              >
                {t("legal.conditions")}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </motion.footer>
  );
}
