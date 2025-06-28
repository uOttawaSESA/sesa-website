"use client";

import Image from "next/image";
import Button from "@/components/Button";

interface ComingSoonMessageProps {
    title: string;
    subtitle: string;
    icon?: string; // Optional icon path
}

const ComingSoonMessage: React.FC<ComingSoonMessageProps> = ({ title, subtitle }) => {
    return (
        <div className="mx-2 flex h-[30rem] max-w-4xl flex-col items-center justify-center gap-6 rounded-2xl border border-white/10 p-10 text-center text-white backdrop-blur-super md:mx-auto md:h-[24rem]">
            <div className="mb-2">
                <Image
                    src="/icons/coming-soon.svg"
                    alt="Coming Soon Icon"
                    width={64}
                    height={64}
                    className="opacity-80"
                />
            </div>
            <h2 className="font-heading text-3xl">{title}</h2>
            <p className="text-md text-thistle/80">{subtitle}</p>
            <Button href="/" variant="fill">
                Back to Home
            </Button>
        </div>
    );
};

export default ComingSoonMessage;
