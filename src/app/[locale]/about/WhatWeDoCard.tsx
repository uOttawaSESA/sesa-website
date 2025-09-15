import Image from "next/image";
import { Link } from "@/i18n/navigation";
import type { ReactNode } from "react";

export interface WhatWeDoCardProps {
    imageHref: string;
    icon: ReactNode;
    heading: string;
    description: string;
    linkLabel: string;
    linkHref: string;
}

export default function WhatWeDoCard({
    imageHref,
    icon,
    heading,
    description,
    linkLabel,
    linkHref,
}: WhatWeDoCardProps) {
    return (
        // Setting a max width of 85vw makes sure that the user can see the next card, indicating that there is something to swipe to.
        // Otherwise, it would be hard to notice that there are more cards
        <div className="outline-gradient w-fit max-w-[85vw] backdrop-blur-lg">
            <Image
                src={imageHref}
                width={400}
                height={200}
                className="w-full h-[200px] object-cover"
                alt={`${heading} image`}
            />
            <div className="flex w-[25rem] flex-col gap-4 p-8">
                <p className="outline-gradient flex h-12 w-12 items-center justify-center">
                    {icon}
                </p>
                <h2 className="font-heading text-lg uppercase md:text-xl">{heading}</h2>
                <p className="text-base leading-tight text-thistle">{description}</p>
                <Link href={linkHref} className="color-gradient font-heading text-lg uppercase">
                    {linkLabel} &gt;
                </Link>
            </div>
        </div>
    );
}
