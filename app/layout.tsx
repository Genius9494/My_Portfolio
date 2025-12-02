import "./globals.css";
import type { Metadata } from "next";
import LayoutClient from "./LayoutClient";

export const metadata: Metadata = {
  title: "ChaoTechX",
  description: "Software Development Company",
  icons: { icon: "/favicon.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body>
        <LayoutClient>
          {children}
        </LayoutClient>
      </body>
    </html>
  );
}
