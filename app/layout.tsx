// app/layout.tsx

import "@/styles/globals.css";
import { fontSans } from "@/config/fonts";
import clsx from "clsx";
import { Providers } from "./providers";
import { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Xyvo AI",
  description: "Your AI-native project platform",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Providers>{children}</Providers>;
}
