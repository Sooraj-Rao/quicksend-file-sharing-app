import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/component/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { Header } from "@/components/component";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "QuickSend - Seamless and Secure File Sharing",
  description:
    "QuickSend is a fast, secure, and easy-to-use file-sharing app for transferring large files of any size across platforms with advanced encryption.",
  keywords:
    "file sharing, secure file transfer, file upload, encryption, fast file transfer, cross-platform file sharing, large file transfer",
  authors: [{ name: "Sooraj Rao" }],
  openGraph: {
    title: "QuickSend - Seamless and Secure File Sharing",
    description:
      "Transfer large files with ease using QuickSend. Secure, fast, and platform-independent file sharing for professionals and casual users.",
    url: "https://quicksend.soorajrao.in",
    siteName: "QuickSend",
    images: [
      {
        url: "https://quicksend.soorajrao.in/home.webp",
        width: 800,
        height: 600,
        alt: "QuickSend",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "QuickSend - Upload and Share Files Easily",
    description:
      "QuickSend enables easy and secure file sharing with lightning-fast uploads and cross-platform compatibility.",
    images: ["https://quicksend.soorajrao.in/home.webp"],
  },
  metadataBase: new URL("https://quicksend.soorajrao.in"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` min-h-screen
        bg-gradient-to-tr from-primary/5 via-primary/20  to-primary/5
        dark:from-black  dark:via-primary/5 dark:to-black
      ${inter.className}`}
      >
        <Toaster />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
