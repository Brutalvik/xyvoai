import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import jwt from "jsonwebtoken";
import { CardProps } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function decodeToken(token: string): any {
  try {
    const decoded = jwt.decode(token);

    return decoded;
  } catch {
    return null;
  }
}

export function getInitials(name: string) {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function getAvatarColor(name: string) {
  const colors = [
    "bg-red-500",
    "bg-pink-500",
    "bg-purple-500",
    "bg-indigo-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
  ];
  const index = name.charCodeAt(0) % colors.length;

  return colors[index];
}

export function getStatusBadge(status: CardProps["status"]) {
  const base = "text-xs font-medium px-2 py-0.5 rounded-full";

  switch (status) {
    case "inProgress":
      return clsx(base, "bg-blue-100 text-blue-700");
    case "blocked":
      return clsx(base, "bg-red-100 text-red-700");
    case "done":
      return clsx(base, "bg-green-100 text-green-700");
    case "review":
      return clsx(base, "bg-yellow-100 text-yellow-700");
    default:
      return clsx(base, "bg-gray-100 text-gray-700");
  }
}
