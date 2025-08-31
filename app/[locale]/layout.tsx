import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { ToastProvider } from "@heroui/toast";
import { Providers } from "@/app/providers";
import NavbarConditional from "@/components/NavbarConditional";
import FooterConditional from "@/components/FooterConditional";
import "@/styles/globals.css";
import { fontSans } from "@/config/fonts";
import clsx from "clsx";
import { ReduxProvider } from "@/store/Provider";

type Props = {
  children: React.ReactNode;
  modals: React.ReactNode;
  params: { locale: string };
};

export default async function LocaleLayout({
  children,
  modals,
  params,
}: Props) {
  const messages = await getMessages();
  if (!messages) notFound();

  const { locale } = await params;
  if (locale !== "en" && locale !== "fr") notFound();
  return (
    <html suppressHydrationWarning lang={locale}>
      <body
        className={clsx(
          "text-foreground bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Providers>
          <ReduxProvider>
            <NextIntlClientProvider locale={locale} messages={messages}>
              <ToastProvider />
              <div className="relative flex flex-col">
                <NavbarConditional />
                <main className="flex-grow">{children}</main>
                <FooterConditional />
                {modals}
              </div>
            </NextIntlClientProvider>
          </ReduxProvider>
        </Providers>
      </body>
    </html>
  );
}
