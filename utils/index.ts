import { isWeekend } from "date-fns";
import { CalendarDate } from "@internationalized/date";

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

export const getInitial = (name: string) => {
  return name?.charAt(0)?.toUpperCase() || "?";
};
export const getBgColor = (seed: string, asHex: boolean = false): string => {
  const colorMap = [
    { class: "bg-red-500", hex: "#ef4444" },
    { class: "bg-pink-500", hex: "#ec4899" },
    { class: "bg-purple-500", hex: "#8b5cf6" },
    { class: "bg-indigo-500", hex: "#6366f1" },
    { class: "bg-blue-500", hex: "#3b82f6" },
    { class: "bg-teal-500", hex: "#14b8a6" },
    { class: "bg-green-500", hex: "#22c55e" },
    { class: "bg-amber-500", hex: "#f59e0b" },
    { class: "bg-orange-500", hex: "#f97316" },
    { class: "bg-rose-500", hex: "#f43f5e" },
  ];

  let hash = 0;

  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }

  let index = Math.abs(hash) % colorMap.length;

  // Safeguard: ensure no black/white
  const color = colorMap[index];
  const isSafeColor = color.hex !== "#ffffff" && color.hex !== "#000000";

  if (!isSafeColor) {
    index = (index + 1) % colorMap.length; // fallback to next safe color
  }

  return asHex ? colorMap[index].hex : colorMap[index].class;
};

export const renderWeekendCell = (date: CalendarDate) => {
  const jsDate = new Date(date.year, date.month - 1, date.day);
  const isWeekendDay = isWeekend(jsDate);

  return {
    className: isWeekendDay ? "bg-yellow-50 text-yellow-700 font-semibold" : "",
  };
};
