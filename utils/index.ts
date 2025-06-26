import { canadianAreaCodes } from "@/chunks/areaCodes";

export const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

export const formatPhoneNumber = (raw?: string): string => {
  const digits = raw?.replace(/\D/g, "") ?? "";
  if (digits.length === 11 && digits.startsWith("1")) {
    const parts = digits.slice(1).match(/(\d{3})(\d{3})(\d{4})/);
    if (parts) return `+1 (${parts[1]}) ${parts[2]} ${parts[3]}`;
  }
  return raw ?? "";
};

export const getFlagFromPhone = (phone: string): string => {
  const areaCode = phone.replace(/\D/g, "").slice(0, 3);
  return canadianAreaCodes.includes(areaCode) ? "🇨🇦" : "🇺🇸";
};
