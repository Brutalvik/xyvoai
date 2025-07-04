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
      id={id}
      name={name}
      type={isPasswordVisible ? "text" : "password"}
      label={label || t("label")}
      placeholder={placeholder || t("placeholder")}
      variant="bordered"
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      isInvalid={isInvalid}
      errorMessage={errorMessage || t("error")}
      size={size}
      endContent={
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="h-full flex items-center pr-2"
        >
          {isPasswordVisible ? (
            <FaEyeSlash className="text-lg text-default-400 pointer-events-none" />
          ) : (
            <FaEye className="text-lg text-default-400 pointer-events-none" />
          )}
        </button>
      }
    />
  );
}
