import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { siteConfig, siteUrl } from "@/lib/site-config";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import "./globals.css";

/* One variable sans for everything, plus its mono for small labels. */
const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteConfig.name} — ${siteConfig.title}`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    siteConfig.name,
    siteConfig.title,
    "portfolio",
    "web developer",
    "software engineer",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: `${siteConfig.name} — ${siteConfig.title}`,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.title}`,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbfaf7" },
    { media: "(prefers-color-scheme: dark)", color: "#0c0b10" },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      // `scroll-smooth` is set on <html>; this tells Next to opt out of it
      // during route transitions rather than warn about it.
      data-scroll-behavior="smooth"
      className={`${geist.variable} ${geistMono.variable} scroll-pt-24 motion-safe:scroll-smooth`}
    >
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        {/* Scroll reveals start hidden; without JS, show everything. */}
        <noscript>
          <style>{`[data-reveal],[data-reveal-item]{opacity:1!important}[data-draw]{stroke-dashoffset:0!important}`}</style>
        </noscript>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
        >
          {/* Skip link for keyboard users */}
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-foreground"
          >
            Skip to content
          </a>
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
