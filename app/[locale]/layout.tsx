import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { ToastProvider } from "@heroui/toast";
import { Providers } from "@/app/providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "@/styles/globals.css";
import { fontSans } from "@/config/fonts"; // ✅ your font import
import clsx from "clsx";
import { ReduxProvider } from "@/store/Provider";
import PageTransitionLoader from "@/components/ui/PageTransitionLoader";

type Props = {
  children: React.ReactNode;
  modals: React.ReactNode; // ✅ required for modal interception
  params: { locale: string };
};

export default async function LocaleLayout({
  children,
  modals,
  params,
}: Props) {
  const messages = await getMessages();
  if (!messages) notFound();

  return (
    <html suppressHydrationWarning lang={params.locale}>
      <body
        className={clsx(
          "text-foreground bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Providers>
          <ReduxProvider>
            <NextIntlClientProvider locale={params.locale} messages={messages}>
              <ToastProvider />
              <div className="relative flex flex-col">
                <Navbar />
                <main className="flex-grow">{children}</main>
                <Footer />
                {modals}
              </div>
            </NextIntlClientProvider>
          </ReduxProvider>
        </Providers>
      </body>
    </html>
  );
}
