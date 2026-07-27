import TitleBar from "@/components/TitleBar";
import type { Metadata } from "next";
import { MC_VERSION, SITE_NAME, SITE_URL } from "@/lib/constants";
import { DisplayAd } from "@/components/Ads/Ad";

export const metadata: Metadata = {
    title: `Addons for Aoba ${MC_VERSION} — Hacked Client for Minecraft Java`,
    description: `Addons for Aoba Hacked Client for Minecraft Java Edition ${MC_VERSION}.`,
    alternates: { canonical: "/addons" },
    openGraph: {
        type: "website",
        url: `${SITE_URL}/addons`,
        siteName: SITE_NAME,
        title: `Addons Aoba ${MC_VERSION} for Minecraft Java`,
        description: `Aoba Hacked Client for Minecraft ${MC_VERSION} addons.`,
        images: [{ url: "/pretty.png", width: 1200, height: 630, alt: `Addons for Aoba ${MC_VERSION}` }],
    },
};

export default function Page() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: `${SITE_NAME} ${MC_VERSION}`,
        alternateName: "Aoba Hacked Client",
        description: `Addons for Aoba Hacked Client`,
        url: `${SITE_URL}/addons`,
        applicationCategory: "GameApplication",
        operatingSystem: `Minecraft Java Edition ${MC_VERSION}`,
        softwareVersion: MC_VERSION,
        downloadUrl: `${SITE_URL}/addons`,
        image: `${SITE_URL}/pretty.png`,
    };

    return (
        <main className="bg-landing bg-cover bg-fixed min-h-screen flex flex-col">
            <script type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <TitleBar />
     
            <div className="flex-grow flex items-center justify-center px-4 py-10">
                <div className="w-full max-w-[600px] text-center bg-background border border-zinc-700 rounded-xl p-8 sm:p-12">
                    <h1 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-tl from-aoba-purple to-aoba-purple-dark pb-2">No addons here yet!</h1>
                    <p className="text-gray-400 text-sm sm:text-base mt-3">Verified community-made addons for Aoba will be listed on this page as they become available.</p>
                    <p className="text-gray-400 text-sm sm:text-base mt-4">Made an addon? Contact <span className="text-aoba-purple font-semibold">@Cocolots</span> on the official Discord to get it featured here.</p>
                    <a href="https://discord.gg/HyZ3uGrwgs"
                        className="inline-block mt-8 shadow font-bold rounded bg-gradient-to-tl from-aoba-purple to-aoba-purple-dark px-8 py-4 text-lg no-underline">
                        Join the Discord
                    </a>
                </div>
            </div>

            <div className="w-1/2 ml-auto mr-auto mt-10">
                <DisplayAd  />
            </div>
        </main>
    )
}
