import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import jwt from "jsonwebtoken";

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
