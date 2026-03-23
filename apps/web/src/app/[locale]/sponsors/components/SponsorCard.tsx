import { cn } from "@repo/ui/lib/utils";
import Image from "next/image";
import type { Sponsor } from "./SponsorData";

type SponsorCardProps = {
    sponsor: Sponsor;
    className: string;
};

export default function SponsorCard({ sponsor, className }: SponsorCardProps) {
    return (
        <a
            href={sponsor.link}
            target="_blank"
            rel="noopener noreferrer"
            title={sponsor.name}
            className={cn(
                "flex items-center justify-center rounded-lg p-10 outline-gradient backdrop-blur-lg transition hover:scale-105",
                sponsor.size,
                className,
            )}
        >
            <Image
                src={sponsor.src}
                alt={sponsor.alt ?? sponsor.name}
                width={sponsor.width}
                height={sponsor.height}
                className={cn("object-contain", sponsor.invert && "brightness-0 invert")}
            />
        </a>
    );
}
