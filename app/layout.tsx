import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";
import { BottomNav } from "@/components/custom-ui/bottom-nav";

const fontSans = Geist({subsets:['latin'],variable:'--font-sans'});


export const metadata: Metadata = {
  title: "core-eb-fe",
  description: "Mobile-first application for seamless user experience",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#6366f1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={fontSans.variable}>
      <body className="bg-background text-foreground antialiased">
        <ThemeProvider>
          <Header />
          {children}
          <BottomNav />
        </ThemeProvider>
      </body>
    </html>
  );
}
