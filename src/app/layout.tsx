import type { Metadata } from "next";
import { DM_Sans, Geist_Mono, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ApostaApp",
  description: "Alavancagem em grupo entre amigos. Greens, reds e streak.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={cn("dark h-full", dmSans.variable, geistMono.variable, "font-sans", geist.variable)}>
      <body className="min-h-full font-sans antialiased">{children}</body>
    </html>
  );
}
