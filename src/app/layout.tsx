import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AppFrame } from "@/components/layout/AppFrame";
import { isDemoCustomerLoggedIn } from "@/lib/customer-session";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "好囍辣 HaoXiLa",
  description: "真實核銷，真實評價。在地餐廳 O2O 美食導購平台",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isLoggedIn = isDemoCustomerLoggedIn();

  return (
    <html lang="zh-Hant">
      <body className={`${inter.variable} antialiased`}>
        <AppFrame isLoggedIn={isLoggedIn}>{children}</AppFrame>
      </body>
    </html>
  );
}
