import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { BgmPlayer } from "@/components/bgm-player";
import { ShootingStars } from "@/components/shooting-stars";
import { StarField } from "@/components/star-field";
import { SiteHeader } from "@/components/site-header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HIBIKI | ネオソウル・ミュージシャン",
  description:
    "ネオソウル・ヴォーカリスト／プロデューサー HIBIKI の公式ポートフォリオ。黄昏のサウンドスケープを描くライブと作品を紹介します。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <StarField />
        <ShootingStars />
        <div className="relative z-10 flex min-h-screen flex-col">
          <SiteHeader />
          {children}
          <BgmPlayer />
        </div>
      </body>
    </html>
  );
}
