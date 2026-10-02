import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { GA_MEASUREMENT_ID, MC_VERSION, SITE_NAME, SITE_URL } from "@/lib/constants";
import CookieConsent from "@/components/CookieConsent/CookieConsent";

const openSans = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `Aoba Hacked Client for Minecraft ${MC_VERSION} — Free Utility Mod`,
    template: `%s | ${SITE_NAME}`,
  },
  description: `Aoba is a free, open-source hacked client for Minecraft Java Edition ${MC_VERSION}. Download the latest utility mod with 80+ hacks and full range of customization.`,
  keywords: [
    `Minecraft ${MC_VERSION} hacked client`,
    "Minecraft hacked client",
    "Aoba Client",
    "Aoba hacked client",
    "Minecraft utility mod",
    "Minecraft Java hacked client",
    `Minecraft ${MC_VERSION} client`,
    "free Minecraft hacked client",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `Aoba Hacked Client for Minecraft ${MC_VERSION}`,
    description: `Free, open-source Minecraft Java hacked client. Supports Minecraft ${MC_VERSION} with 80+ hacks.`,
    images: [
      {
        url: "/pretty.png",
        width: 1200,
        height: 630,
        alt: `Aoba Hacked Client for Minecraft ${MC_VERSION}`,
      },
    ],
  },
};

export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
  const publisherId =  process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID;

  return (
    <html lang="en" className={openSans.className}>
      <head>
        <link rel="icon" href="/icon.ico" sizes="any" />
      </head>
      <body className="bg-background">
		{children}
		<CookieConsent measurementId={GA_MEASUREMENT_ID} />
		</body>
      <Script id="nextjs-google-adsense"
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-${publisherId}`}
            strategy="afterInteractive"
            crossOrigin="anonymous"/>
    </html>
  );
}
