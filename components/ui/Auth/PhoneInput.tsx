"use client";

import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/react";
import { useState, useEffect, ChangeEvent, FocusEvent } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";

import countryCodes from "@/chunks/countryCodes.json";
import { getFlagFromPhone } from "@/utils";

interface PhoneInputProps {
  id: string;
  name: string;
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: FocusEvent<HTMLInputElement>) => void;
  isInvalid: boolean;
  errorMessage?: string;
  size?: "sm" | "md" | "lg";
  setFormikFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean,
  ) => void;
  formikCountryCode: string;
}

export function PhoneInput({
  id,
  name,
  label,
  placeholder,
  value,
  onChange,
  onBlur,
  isInvalid,
  errorMessage,
  size = "sm",
  setFormikFieldValue,
  formikCountryCode,
}: PhoneInputProps) {
  const t = useTranslations("phone");
  const [selectedId, setSelectedId] = useState("1");
  const [flag, setFlag] = useState("🇺🇸");

  useEffect(() => {
    const matched = countryCodes.find((c) => c.dial_code === formikCountryCode);

    if (matched) {
      setSelectedId(matched.id);
      setFlag(matched.flag);
    } else {
      setSelectedId("1");
      setFlag("🌐");
    }
  }, [formikCountryCode]);

  const handleCodeChange = (id: string) => {
    setSelectedId(id);
    const selected = countryCodes.find((c) => c.id === id);

    if (selected) {
      setFlag(selected.flag);
      setFormikFieldValue("countryCode", selected.dial_code);
    } else {
      setFlag("🌐");
    }
  };

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e);
    const digits = e.target.value.replace(/\D/g, "");
    const current = countryCodes.find((c) => c.id === selectedId);

    if (current?.dial_code === "+1" && digits.length >= 3) {
      const dynamicFlag = getFlagFromPhone(digits);

      if (dynamicFlag && dynamicFlag !== flag) {
        setFlag(dynamicFlag);
      }
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-2">
      <div className="flex items-center gap-2 w-full sm:w-1/3">
        <AnimatePresence mode="wait">
          <motion.span
            key={flag}
            animate={{ scale: 1, opacity: 1 }}
            className="text-xl"
            exit={{ scale: 0.6, opacity: 0 }}
            initial={{ scale: 0.6, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {flag}
          </motion.span>
        </AnimatePresence>
        <Select
          aria-label={t("countryCode")}
          className="w-full"
          renderValue={() => {
            const selected = countryCodes.find((c) => c.id === selectedId);

            return <span>{selected?.dial_code || ""}</span>;
          }}
          selectedKeys={new Set([selectedId])}
          size="md"
          variant="bordered"
          onSelectionChange={(keys) => {
            const id = String(Array.from(keys)[0]);

            handleCodeChange(id);
          }}
        >
          {countryCodes.map((country) =>
            country.code === "CA" ? null : (
              <SelectItem key={country.id} textValue={country.dial_code}>
                <div className="flex items-center gap-2">
                  <span className="text-xs">{country.code}</span>
                  <span>{country.dial_code}</span>
                </div>
              </SelectItem>
            ),
          )}
        </Select>
      </div>
      <Input
        className="w-full sm:w-2/3"
        errorMessage={errorMessage}
        id={id}
        isInvalid={isInvalid}
        label={label || t("label")}
        name={name}
        placeholder={placeholder || t("placeholder")}
        size={size}
        value={value}
        variant="bordered"
        onBlur={onBlur}
        onChange={handlePhoneChange}
      />
    </div>
  );
}
