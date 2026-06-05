import type { Metadata } from "next";
import { display, sans, mono } from "@/lib/fonts";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/components/auth-provider";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

export const metadata: Metadata = {
  title:
    "DePin.Builders: Verified DePIN Projects, Hardware Reviews, ROI Calculator and Rankings (2026)",
  description:
    "The independent research hub for Decentralized Physical Infrastructure Networks. Compare verified DePIN projects, calculate hardware ROI, and find the best DePIN to deploy in 2026. Measured, not estimated.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://depin.builders",
  ),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
    >
      <body>
        <AuthProvider>
          <ThemeProvider>
            <SiteNav />
            <main id="main" className="min-h-screen">
              {children}
            </main>
            <SiteFooter />
          </ThemeProvider>
          <Analytics />
          <SpeedInsights />
        </AuthProvider>
      </body>
    </html>
  );
}
