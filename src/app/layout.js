import "./globals.css";
import { Amarante, Geist, Geist_Mono } from "next/font/google";
import QueryProvider from "./query-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const amarante = Amarante({
  weight: "400",
  subsets: ["latin"],
  display: "auto",
  variable: "--font-amarante",
});

// Metadata for SEO & social sharing
export const metadata = {
  title: "Ealaami Interior Solutions",
  description: "Ealaami Interior Solutions – Expert interior design and home solutions.",
  keywords: "Ealaami, interior design, home solutions, interiors, decoration",
  authors: [{ name: "Ealaami" }],
  robots: "index, follow",
  icons: {
    icon: "/images/titleLogo.jpg",
  },
  alternates: {
    canonical: "https://www.ealaami.in",
  },
  openGraph: {
    title: "Ealaami Interior Solutions",
    description: "Ealaami Interior Solutions – Expert interior design and home solutions.",
    url: "https://www.ealaami.in",
    siteName: "Ealaami",
    images: [
      {
        url: "https://www.ealaami.in/images/titleLogo.jpg",
        width: 800,
        height: 600,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ealaami Interior Solutions",
    description: "Ealaami Interior Solutions – Expert interior design and home solutions.",
    images: ["https://www.ealaami.in/images/titleLogo.jpg"],
  },
};


export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${amarante.variable}`}
    >
       <head>
        {/* ✅ Structured Data for Google Logo */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Ealaami Interior Solutions",
              "url": "https://www.ealaami.in",
              "logo": "https://www.ealaami.in/images/titleLogo.jpg",
            }),
          }}
        />
      </head>
      <body className="antialiased">
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
