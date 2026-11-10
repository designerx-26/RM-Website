import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { site } from "@/content/site";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.meta.url),
  title: `${site.meta.name} | ${site.meta.tagline}`,
  description: site.meta.description,
  alternates: { canonical: "/" },
  // No og:title/description here: those would override every page's own title and
  // description in link previews; crawlers fall back to <title> and meta description.
  openGraph: {
    type: "website",
    siteName: site.meta.name,
    images: [{ url: site.meta.shareImage, alt: "Rensselaer Motorsport car #86" }],
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
