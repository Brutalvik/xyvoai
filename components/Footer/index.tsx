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

  const fadeInUp = {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  return (
    <motion.footer
      initial="initial"
      animate="animate"
      className="bg-[#0e101a] text-sm text-gray-400 w-full"
    >
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {/* Logo + Tagline */}
        <motion.div {...fadeInUp}>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-4 flex">
              <Logo />
            </div>
            <span className="text-white font-semibold text-base text-[1.5rem] mt-4">
              YVO
            </span>
          </div>
          <p className="text-white-500 text-sm leading-relaxed">
            {t("tagline")}
          </p>
          <div className="flex gap-4 mt-4 text-xl text-white-500">
            {[
              {
                icon: <FaGithub />,
                href: "https://github.com",
                label: "GitHub",
              },
              {
                icon: <FaLinkedin />,
                href: "https://linkedin.com",
                label: "LinkedIn",
              },
              {
                icon: <FaTwitter />,
                href: "https://twitter.com",
                label: "Twitter",
              },
            ].map((item, i) => (
              <motion.a
                key={i}
                href={item.href}
                aria-label={item.label}
                className="hover:text-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.15 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {item.icon}
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Product */}
        <motion.div {...fadeInUp} transition={{ duration: 0.5, delay: 0.1 }}>
          <h3 className="text-white-500 font-semibold mb-2">
            {t("product.title")}
          </h3>
          <ul className="space-y-1">
            {[
              { href: "#features", label: "features" },
              { href: "/pricing", label: "pricing" },
              { href: "/integrations", label: "integrations" },
              { href: "/api", label: "api" },
            ].map((item, i) => (
              <motion.li key={i} whileHover={{ scale: 1.04 }}>
                <Link
                  href={`/${locale}${item.href}`}
                  className="hover:text-white transition-colors inline-block"
                >
                  {t(`product.${item.label}`)}
                </Link>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Legal */}
        <motion.div {...fadeInUp} transition={{ duration: 0.5, delay: 0.2 }}>
          <h3 className="text-white-500 font-semibold mb-2">
            {t("legal.title")}
          </h3>
          <ul className="space-y-1">
            {[
              { href: "/legal/privacy", label: "privacy" },
              { href: "/legal/conditions", label: "conditions" },
            ].map((item, i) => (
              <motion.li key={i} whileHover={{ scale: 1.04 }}>
                <Link
                  href={`/${locale}${item.href}`}
                  className="hover:text-white transition-colors inline-block"
                >
                  {t(`legal.${item.label}`)}
                </Link>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>

      <motion.div
        {...fadeInUp}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="w-full text-center text-xs text-white-500 mt-4"
      >
        &copy; 2025 Xyvo Inc. All rights reserved.
      </motion.div>
    </motion.footer>
  );
}
