"use client";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

export default function CTA() {
    return (
        <div className="relative z-10 flex w-full flex-col items-center justify-center px-4 py-8 text-center">
            <div className="flex flex-wrap items-center justify-center gap-3">
                <p className="font-heading text-lg uppercase text-white">
                    Interested in joining our growing network of industry partners?
                </p>
                <Link href="/ContactUsPage">
                    <Button className="px-4 py-1.5 font-heading text-sm uppercase text-white">
                        Let&apos;s Talk
                    </Button>
                </Link>
            </div>

            <p className="mt-4 font-sans text-sm tracking-widest text-thistle">
                We&apos;ll get back to you within 48 hours.
            </p>
        </div>
    );
}
