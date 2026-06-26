import type { Metadata, Viewport } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Puertas Abiertas en Yugo Cartuja | Sábado 4 de julio",
  description:
    "Ven a conocer Yugo Cartuja en nuestra jornada de puertas abiertas del sábado 4 de julio en Sevilla. Visita las habitaciones, descubre los espacios comunes y reserva tu plaza. Plazas limitadas.",
  openGraph: {
    title: "Puertas Abiertas en Yugo Cartuja | Sábado 4 de julio",
    description:
      "Visita la residencia, conoce los espacios comunes y reserva tu plaza para la jornada de puertas abiertas en Sevilla.",
    type: "website",
    locale: "es_ES",
    images: ["/images/terraza.jpg"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#3f2d51",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${poppins.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
