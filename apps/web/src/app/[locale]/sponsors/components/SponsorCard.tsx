import Image from "next/image";
import { gradientBorderClass, type Sponsor } from "./SponsorData";

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
            className={`flex items-center justify-center rounded-lg p-10 ${sponsor.size} ${gradientBorderClass} ${sponsor.featureLevel} backdrop-blur-lg transition hover:scale-105 ${className}`}
        >
            <Image
                src={sponsor.src}
                alt={sponsor.alt ?? sponsor.name}
                width={sponsor.width}
                height={sponsor.height}
                className={`object-contain ${sponsor.invert ? "brightness-0 invert" : ""}`}
            />
        </a>
    );
}
