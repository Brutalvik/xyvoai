// app/[locale]/layout.tsx
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "@/styles/globals.css";
import { fontSans } from "@/config/fonts";
import clsx from "clsx";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  const messages = await getMessages();
  if (!messages) notFound();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={clsx(
          "text-foreground bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <div className="relative flex flex-col font-sans antialiased">
            <Navbar />
            <main className="w-full max-w-none flex-grow">{children}</main>
            <Footer />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
