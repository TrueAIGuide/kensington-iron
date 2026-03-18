import type { Metadata } from "next";
import { Noto_Serif, Manrope } from "next/font/google";
import "./globals.css";

const notoSerif = Noto_Serif({
  variable: "--font-noto-serif",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kensington Iron",
  description: "A private members club for the body and mind in Mayfair.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HealthClub",
    "name": "Kensington Iron",
    "description": "A private members club for the body and mind in Mayfair.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Mayfair",
      "addressRegion": "London",
      "addressCountry": "UK"
    },
    "priceRange": "$$$$"
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${notoSerif.variable} ${manrope.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
