"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setLanguage } from "@/store/slices/languageSlice";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import clsx from "clsx";

const languages = [
  { code: "en", label: "EN", flag: "🇺🇸" },
  { code: "fr", label: "FR", flag: "🇫🇷" },
];

export default function LanguageSwitch() {
  const selected = useAppSelector((state) => state.language.selected);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();

  const [open, setOpen] = useState(false);

  const handleSelect = (code: "en" | "fr") => {
    dispatch(setLanguage(code));
    const newPath = pathname.replace(/^\/(en|fr)/, `/${code}`);
    router.push(newPath);
    setOpen(false);
  };

  const current = languages.find((l) => l.code === selected)!;

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button className="flex items-center gap-1 px-2 py-1 rounded-md hover:bg-default-100">
        <span className="text-xl">{current.flag}</span>
        <span className="text-sm font-medium">{current.label}</span>
      </button>

      {open && (
        <div className="absolute left-0 mt-2 bg-white dark:bg-neutral-800 rounded shadow z-50">
          {languages
            .filter((l) => l.code !== selected)
            .map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleSelect(lang.code as "en" | "fr")}
                className={clsx(
                  "flex items-center gap-1 px-3 py-2 text-sm w-full text-left hover:bg-default-100"
                )}
              >
                <span className="text-xl">{lang.flag}</span>
                <span>{lang.label}</span>
              </button>
            ))}
        </div>
      )}
    </div>
  );
}
