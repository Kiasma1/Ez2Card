import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { cn } from "@/lib/utils";
import Header from "./_components/header";
import Footer from "./_components/footer";
import Script from "next/script";
import { Toaster } from "@/components/ui/sonner";
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
  title: "Ez2Card",
  description: "Ez2Card",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800",
          `${geistSans.variable} ${geistMono.variable} antialiased text-gray-800`
        )}
      >
        <Header />
        {children}
        <Footer />
        <ToastContainer />
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
