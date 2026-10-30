import { DisplayAd } from "@/components/Ads/Ad";
import InformationPane from "@/components/InformationPane/InformationPane";
import TitleBar from "@/components/TitleBar";
import Link from "next/link";
import React from "react";
import type { Metadata } from "next";
import { MC_VERSION, SITE_NAME, SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
    title: `Download Aoba ${MC_VERSION} — Hacked Client for Minecraft Java`,
    description: `Download the latest Aoba Hacked Client for Minecraft Java Edition ${MC_VERSION}. Free, open-source, and packed with 80+ useful hacks.`,
    alternates: { canonical: "/download" },
    openGraph: {
        type: "website",
        url: `${SITE_URL}/download`,
        siteName: SITE_NAME,
        title: `Download Aoba ${MC_VERSION} for Minecraft Java`,
        description: `Aoba Hacked Client for Minecraft ${MC_VERSION} free download.`,
        images: [{ url: "/pretty.png", width: 1200, height: 630, alt: `Download Aoba ${MC_VERSION}` }],
    },
};

type Release = {
    url: string,
    assets_url: string,
    upload_url: string,
    html_url: string,
    id: number,
    author: Uploader,
    node_id: string,
    tag_name: string,
    draft: boolean,
    prerelease: boolean,
    created_at: string,
    published_at: string,
    assets: ReleaseAsset[],
    tarball_url: string,
    zipball_url: string,
    body: string,
    body_html: string,
    mentions_count: number,
}

type ReleaseAsset = {
    url: string,
    id: number,
    node_id: string,
    name: string,
    label: string | undefined,
    uploader: Uploader,
    content_type: string,
    state: string,
    size: number,
    download_count: number,
    created_at: string,
    updated_at: string,
    browser_download_url: string,
}

type Uploader = {
    login: string,
    id: number,
    node_id: string,
    avatar_url: string,
    gravatar_id: string,
    url: string,
    html_url: string,
    followers_url: string,
    following_url: string,
    gists_url: string,
    starred_url: string,
    subscriptions_url: string,
    organizations_url: string,
    repos_url: string,
    events_url: string,
    received_events_url: string,
    type: string,
    site_admin: boolean,
}

function parseTagName(tagName: string): { version: string; date?: string } {
    const newFormat = tagName.match(/^build-([\d.]+)-(\d{8})$/);
    if (newFormat) {
        const [, version, dateStr] = newFormat;
        const month = parseInt(dateStr.substring(0, 2)) - 1;
        const day = parseInt(dateStr.substring(2, 4));
        const year = parseInt(dateStr.substring(4, 8));
        const formatted = new Date(year, month, day).toLocaleDateString('en-US', {
            month: 'long', day: 'numeric', year: 'numeric'
        });
        return { version, date: formatted };
    }
    const oldFormat = tagName.match(/^build-(.+)$/);
    if (oldFormat) return { version: oldFormat[1] };
    return { version: tagName };
}

function parseAssetVersion(name: string): string {
    const withoutExt = name.replace(/\.jar$/, "");
    const newFormat = withoutExt.match(/-([\d.]+)-\d{8}$/);
    if (newFormat) return newFormat[1];
    const parts = withoutExt.split("-");
    return parts[parts.length - 1];
}

const DownloadPane = ({ release }: { release: Release }) => {
    const parsed = parseTagName(release.tag_name);

    const generateDownloads = () => {
        return release.assets.map((e: ReleaseAsset) => {
            let minecraftVersion = parseAssetVersion(e.name);
            return (
                <div key={e.id} className="flex items-center justify-between py-3 border-b border-zinc-700 last:border-b-0">
                    <div className="flex-grow">
                        <p className="font-medium">{minecraftVersion}</p>
                        <p className="text-xs text-zinc-400">{e.name}</p>
                    </div>
                    <a className="shrink-0 bg-gradient-to-r from-aoba-purple-dark to-[#9c6ccc] rounded-lg px-4 py-2 text-sm font-semibold hover:opacity-90 transition-opacity" href={e.browser_download_url}>
                        Download
                    </a>
                </div>
            )
        });
    }

    return (
        <div className="border border-zinc-700 bg-[#1a1a1e] rounded-xl mt-5 mb-5 overflow-hidden">
            <div className="px-5 py-4 border-b border-zinc-700 bg-black/20">
                <h2 className="text-2xl">Aoba <span className="text-aoba-purple">{parsed.version}</span></h2>
                {parsed.date && <p className="text-sm text-zinc-400">{parsed.date}</p>}
            </div>

            <div className="px-5 py-2">
                {generateDownloads()}
            </div>

            {release.body_html && (
                <div className="px-5 py-4 border-t border-zinc-700">
                    <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">Changelog</p>
                    <div className="text-left text-sm text-gray-300 [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:mt-3 [&_h2]:mb-1 [&_h3]:text-base [&_h3]:font-semibold [&_h3]:mt-2 [&_ul]:list-disc [&_ul]:ml-5 [&_ul]:my-1 [&_li]:my-0.5 [&_a]:text-aoba-purple [&_a]:underline"
                        dangerouslySetInnerHTML={{ __html: release.body_html }}
                    />
                </div>
            )}
        </div>
    )
}

const Releases = async () => {
    const githubData = await fetch("https://api.github.com/repos/Cocolots/Aoba-Client/releases", {
        next: { revalidate: 3600 },
        headers: { Accept: "application/vnd.github.html+json" },
    })
        .then((e) => { return e.json(); })
        .then((json) => { return json })

    const generateReleaseDownloads = () => {
        if (!Array.isArray(githubData)) return undefined;

        const visibleReleases = githubData.filter((e: Release) => !e.prerelease);

        return visibleReleases.map((e: Release, index: number) => (
            <React.Fragment key={e.id}>
                <DownloadPane release={e} />
                {index < 3 && <DisplayAd />}
            </React.Fragment>
        ));
    }

    return generateReleaseDownloads();
}

export default function Page() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: `${SITE_NAME} ${MC_VERSION}`,
        alternateName: "Aoba Hacked Client",
        description: `Aoba Hacked Client for Minecraft Java Edition ${MC_VERSION}.`,
        url: `${SITE_URL}/download`,
        applicationCategory: "GameApplication",
        operatingSystem: `Minecraft Java Edition ${MC_VERSION}`,
        softwareVersion: MC_VERSION,
        downloadUrl: `${SITE_URL}/download`,
        image: `${SITE_URL}/pretty.png`,
    };

    return (
        <main className="bg-landing bg-cover bg-fixed">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <TitleBar />
            <div className="mx-4 my-6 sm:mx-auto sm:my-10 w-auto max-w-[850px] sm:w-11/12 md:w-3/4 bg-background border border-zinc-700 p-4 sm:p-6 md:p-10 rounded-xl">
                <h1 className="pb-2 text-2xl sm:text-3xl md:text-4xl">Download Aoba Hacked Client {MC_VERSION} for Minecraft Java</h1>
                <p className="text-gray-400 text-sm sm:text-base">Free, open-source utility mod for Minecraft Java Edition. Below are all available builds, ranging from Minecraft 1.19.4 through {MC_VERSION}.</p>

                <InformationPane className="my-5">
                    <h2 className="text-aoba-purple">📥 Installation Instructions</h2>
                    <p>Installation instructions can be found on the <Link prefetch={false} href="/wiki">Wiki</Link></p>
                </InformationPane>

                <Releases />
            </div>
        </main>
    )
}
