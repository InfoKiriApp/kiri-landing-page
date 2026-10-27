import type { Metadata } from "next"
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import CookieBanner from "@/components/cookie-banner"
import GenieChat from "@/components/genie-chat"
import { SITE_URL } from "@/lib/site"
import "./globals.css"

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Kiri — La cuenta de inversión para niños",
  description:
    "Kiri es una cuenta de ahorro e inversión para niños de 0 a 18 años. Regala un futuro financiero mejor a tus seres queridos.",
  generator: "v0.app",
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`${plusJakarta.variable} ${playfair.variable} font-sans antialiased`}>
        {children}
        <CookieBanner />
        <GenieChat />
        <Analytics />
      </body>
    </html>
  )
}
