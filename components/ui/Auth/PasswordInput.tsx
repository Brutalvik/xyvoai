"use client";

import { Input } from "@heroui/input";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { useTranslations } from "next-intl";

interface PasswordInputProps {
  id: string;
  name: string;
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  isInvalid: boolean;
  errorMessage?: string;
  size?: "sm" | "md" | "lg";
}

export function PasswordInput({
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
}: PasswordInputProps) {
  const t = useTranslations("password");

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => setIsPasswordVisible((prev) => !prev);

  return (
    <Input
      endContent={
        <button
          className="h-full flex items-center pr-2"
          type="button"
          onClick={togglePasswordVisibility}
        >
          {!isPasswordVisible ? (
            <FaEyeSlash className="text-lg text-default-400 pointer-events-none" />
          ) : (
            <FaEye className="text-lg text-default-400 pointer-events-none" />
          )}
        </button>
      }
      errorMessage={errorMessage || t("error")}
      id={id}
      isInvalid={isInvalid}
      label={label || t("label")}
      name={name}
      placeholder={placeholder || t("placeholder")}
      size={size}
      type={isPasswordVisible ? "text" : "password"}
      value={value}
      variant="bordered"
      onBlur={onBlur}
      onChange={onChange}
    />
  );
}
