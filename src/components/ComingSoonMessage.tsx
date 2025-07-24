"use client";

import Image from "next/image";
import Button from "@/components/Button";

interface ComingSoonMessageProps {
    title: string;
    subtitle: string;
    homeButton: boolean;
}

const ComingSoonMessage: React.FC<ComingSoonMessageProps> = ({ title, subtitle, homeButton }) => {
    return (
        <div
            className={`mx-2 flex max-w-4xl flex-col items-center justify-center gap-6 rounded-2xl border border-white/10 p-10 text-center text-white backdrop-blur-super md:mx-auto ${
                homeButton ? "h-[30rem] md:h-[24rem]" : "h-[24rem] md:h-[18rem]"
            }`}
        >
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
            {homeButton && (
                <Button href="/" variant="fill">
                    Back to Home
                </Button>
            )}
        </div>
    );
};

export default ComingSoonMessage;
