"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

type ConsentState = "accepted" | "declined" | "undecided";

const CONSENT_KEY = "aoba-analytics-consent";

export default function CookieConsent({ measurementId }: { measurementId?: string }) {
    const [consent, setConsent] = useState<ConsentState | null>(null);

    useEffect(() => {
        let stored: string | null = null;
        try {
            stored = localStorage.getItem(CONSENT_KEY);
        } catch { }
        setConsent(stored === "accepted" || stored === "declined" ? stored : "undecided");
    }, []);

    const choose = (value: "accepted" | "declined") => {
        try {
            localStorage.setItem(CONSENT_KEY, value);
        } catch { }
        setConsent(value);
    };

    return (
        <>
            {consent === "accepted" && measurementId && (
                <>
                    <Script
                        id="ga4-src"
                        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
                        strategy="afterInteractive"
                    />
                    <Script id="ga4-init" strategy="afterInteractive">
                        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${measurementId}');`}
                    </Script>
                </>
            )}
            {consent === "undecided" && (
                <div
                    role="dialog"
                    aria-live="polite"
                    aria-label="Cookie consent"
                    className="fixed bottom-0 inset-x-0 z-50 bg-background-accent border-t border-border-purple px-4 py-4"
                >
                    <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center gap-4">
                        <p className="text-sm flex-1">
                            We use Google Analytics cookies to understand how visitors use this site. You can accept or decline analytics tracking.
                        </p>
                        <div className="flex gap-3 shrink-0">
                            <button
                                type="button"
                                onClick={() => choose("declined")}
                                className="px-4 py-2 rounded border border-aoba-purple text-sm hover:bg-aoba-purple-0.2"
                            >
                                Decline
                            </button>
                            <button
                                type="button"
                                onClick={() => choose("accepted")}
                                className="px-4 py-2 rounded bg-aoba-purple-dark text-sm hover:bg-aoba-purple hover:text-background"
                            >
                                Accept
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
