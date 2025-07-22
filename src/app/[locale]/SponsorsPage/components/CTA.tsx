"use client";
import Button from "@/components/Button";
import Link from "next/link";

export default function CTA() {
    return (
        <div className="relative z-10 flex w-full flex-col items-center justify-center px-4 py-8 text-center">
            <div className="flex flex-wrap items-center justify-center gap-3">
                <p className="font-heading text-lg uppercase text-white">
                    Interested in joining our growing network of industry partners?
                </p>
                <Link href="/contact">
                    <Button className="font-heading px-4 py-1.5 text-sm uppercase text-white">
                        Let&apos;s Talk
                    </Button>
                </Link>
            </div>

            <p className="text-thistle mt-4 font-sans text-sm tracking-widest">
                We&apos;ll get back to you within 48 hours.
            </p>
        </div>
    );
}
