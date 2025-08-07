"use client";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

export default function CTA() {
    return (
        <div className="relative z-10 flex w-full flex-col items-center justify-center px-4 py-6 text-center md:py-8">
            <div className="flex flex-col items-center justify-center gap-5 md:flex-row md:flex-wrap md:gap-8">
                <p className="text-center font-heading text-sm uppercase text-white md:text-lg">
                    Interested in joining our growing network of industry partners?
                </p>
                <Button asChild className="px-5 font-heading uppercase text-white">
                    <Link href="/ContactUsPage">Let&apos;s Talk</Link>
                </Button>
            </div>

            <p className="mt-4 font-sans text-xs tracking-widest text-thistle md:text-sm">
                We&apos;ll get back to you within 48 hours.
            </p>
        </div>
    );
}
