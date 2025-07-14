"use client";

import { Input } from "@heroui/input";
import { Kbd } from "@heroui/kbd";
import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import { useTranslations } from "next-intl";

import { SearchIcon } from "@/components/icons";

export const SearchInput = ({ autoFocus = false }: { autoFocus?: boolean }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const t = useTranslations("Search");

  const shouldExpand = isFocused || value.length > 0 || autoFocus;

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  return (
    <div
      className={clsx(
        "transition-all duration-300 ease-in-out origin-right",
        "w-full",
        "lg:w-[300px]",
        shouldExpand && "lg:w-[440px]",
      )}
      style={{ transformOrigin: "right" }}
    >
      <Input
        ref={inputRef}
        aria-label={t("ariaLabel")}
        classNames={{
          inputWrapper: "bg-default-100",
          input: "text-sm",
        }}
        endContent={
          <Kbd className="hidden lg:inline-block" keys={["command"]}>
            K
          </Kbd>
        }
        labelPlacement="outside"
        placeholder={t("placeholder")}
        startContent={
          <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
        }
        type="search"
        value={value}
        onBlur={() => setIsFocused(false)}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setIsFocused(true)}
      />
    </div>
  );
};
