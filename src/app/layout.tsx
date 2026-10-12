import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans_Bengali } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Providers } from "@/components/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoBengali = Noto_Sans_Bengali({
  variable: "--font-bn",
  subsets: ["bengali"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "VocabQuest — Interactive Vocabulary Learning",
  description:
    "Practice English vocabulary for IELTS, TOEFL, GRE, SAT, BCS and admission exams. Flashcards, quizzes, spaced-repetition revision, and Bengali meanings — no account required.",
  keywords: [
    "vocabulary",
    "IELTS",
    "TOEFL",
    "GRE",
    "SAT",
    "BCS",
    "Bengali vocabulary",
    "flashcards",
    "spaced repetition",
  ],
  authors: [{ name: "VocabQuest" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${notoBengali.variable} antialiased bg-background text-foreground`}
      >
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
