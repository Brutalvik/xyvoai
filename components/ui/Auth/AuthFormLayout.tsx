"use client";

import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Image } from "@heroui/react";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { motion } from "framer-motion";
import { RiKeyFill } from "react-icons/ri"; // Import RiKeyFill
import { useLocale } from "next-intl";
import { useTranslations } from "next-intl";

interface AuthFormLayoutProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  showSocials?: boolean;
  alternativeAuthLink?: {
    text: string;
    href: string;
    linkText: string;
  };
  showKeyIcon?: boolean; // New prop
}

export default function AuthFormLayout({
  title,
  subtitle,
  children,
  showSocials = true,
  alternativeAuthLink,
  showKeyIcon = true,
}: AuthFormLayoutProps) {
  const locale = useLocale();
  const t = useTranslations("signup");

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="p-2 w-full max-w-full mx-auto lg:mt-0 shadow-2xl backdrop-blur bg-grey/10 bg-white/10">
        <CardHeader className="flex flex-col items-center justify-center space-y-2">
          <div className="flex items-center gap-4">
            {showKeyIcon ? ( // Conditionally render RiKeyFill
              <RiKeyFill className="text-default-500" size={50} />
            ) : (
              <div className="flex items-center gap-1">
                <Image
                  alt="XYVO Logo"
                  className="h-10 w-10 object-contain"
                  height={40}
                  src="/x.png"
                  width={40}
                />
              </div>
            )}
          </div>
          <h2 className="text-lg font-medium text-center text-default-600">
            {title}
          </h2>
          <p className="text-sm text-center text-default-400">{subtitle}</p>
        </CardHeader>

        <CardBody className="space-y-2">{children}</CardBody>

        <CardFooter className="flex flex-col space-y-1">
          <p className="text-xs text-center text-default-500 mt-2">
            {t.rich("agreementNotice", {
              terms: (chunks: React.ReactNode): JSX.Element => (
                <a
                  className="underline text-primary"
                  href={`/${locale}/legal/conditions`}
                >
                  {chunks}
                </a>
              ),
              privacy: (chunks: React.ReactNode): JSX.Element => (
                <a
                  className="underline text-primary"
                  href={`/${locale}/legal/privacy`}
                >
                  {chunks}
                </a>
              ),
            })}
          </p>

          {alternativeAuthLink && (
            <div className="text-xs text-center">
              {alternativeAuthLink.text}{" "}
              <Link
                className="underline hover:text-blue-500"
                href={alternativeAuthLink.href}
              >
                {alternativeAuthLink.linkText}
              </Link>
            </div>
          )}

          {showSocials && (
            <>
              <div className="mt-3 text-center text-xs text-white/70">
                or continue with
              </div>
              <div className="flex justify-center gap-4 mt-2">
                <FcGoogle className="cursor-pointer" size={30} />
                <FaFacebook
                  className="cursor-pointer text-blue-600"
                  size={26}
                />
              </div>
            </>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
}
