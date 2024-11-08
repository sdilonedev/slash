import type { Metadata } from "next";

import localFont from "next/font/local";
import "./globals.css";

// Header component:
import Header from "@/components/layout/header";

// Next Themes provider:
import { ThemeProvider } from "@/components/providers/theme-provider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Slash",
  description: "An open source url shorter with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="dark" lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-black dark:bg-neutral-900 dark:text-white`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
        >
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
