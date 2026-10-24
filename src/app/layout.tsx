import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { AdminAuthProvider } from "@/context/AdminAuthContext";
import AppChrome from "@/components/layout/AppChrome";

export const metadata: Metadata = {
  title: "NusantaraOrigin — 100% Pure Coconut Charcoal & Agro Commodities Exporter",
  description:
    "Portal verifikasi mutu ekspor briket arang batok kelapa 100% murni standar Platinum Shisha Dubai & BBQ Eropa. IMO Non-DG Special Provision 925, sertifikasi SGS, dan kalkulator kontainer maritim.",
  keywords: [
    "coconut shell charcoal briquettes",
    "briket arang batok kelapa",
    "shisha charcoal indonesia",
    "IMO Non-DG SP925",
    "export charcoal chalabi standard",
    "FOB Tanjung Perak",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="dark">
      <body className="bg-background text-on-surface antialiased flex flex-col min-h-screen">
        <LanguageProvider>
          <AdminAuthProvider>
            <AppChrome>{children}</AppChrome>
          </AdminAuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
