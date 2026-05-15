import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Sidebar from "@/app/components/client/Sidebar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tendak'Anina - Expérience Culinaire",
  description: "Plateforme de gestion d'événements culinaires premium",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="h-full bg-[#1a1d1a] text-white flex overflow-hidden">
        {/* Barre latérale fixe à gauche */}
        <Sidebar />

        {/* Zone de contenu principale défilable */}
        <main className="flex-1 h-full overflow-y-auto relative custom-scrollbar">
          {children}
        </main>
      </body>
    </html>
  );
}