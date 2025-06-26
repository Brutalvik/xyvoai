"use client";

import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setLanguage } from "@/store/slices/languageSlice";
import { useRouter, usePathname } from "next/navigation";
import { selectLanguage } from "@/store/selectors";
import clsx from "clsx";

const languages = [
  { code: "en", label: "EN", flag: "🇺🇸" },
  { code: "fr", label: "FR", flag: "🇫🇷" },
];

export default function LanguageSwitch() {
  const lang = useAppSelector(selectLanguage);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();

  const selectedKeys = new Set([lang]);

  const handleSelectionChange = (keys: React.Key[]) => {
    const selected = keys[0] as "en" | "fr";
    dispatch(setLanguage(selected));
    const newPath = pathname.replace(/^\/(en|fr)/, `/${selected}`);
    router.push(newPath);
  };

  const selected = languages.find((l) => l.code === lang)!;

  return (
    <Dropdown type="menu" className="min-w-fit">
      <DropdownTrigger>
        <div className="hover:cursor-pointer">
          <span className="text-md">{selected.flag}</span>
          {selected.label}
        </div>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Language Selection"
        selectionMode="single"
        selectedKeys={selectedKeys}
        onSelectionChange={(keys) => handleSelectionChange(Array.from(keys))}
        className="min-w-fit"
      >
        {languages
          .filter((l) => l.code !== lang)
          .map((lang) => (
            <DropdownItem key={lang.code}>
              <span className="text-md">{lang.flag}</span>
              {lang.label}
            </DropdownItem>
          ))}
      </DropdownMenu>
    </Dropdown>
  );
}
