import Image from "next/image";
import { useTranslations } from "next-intl";
import { type ReactNode, useState } from "react";
import type { Member, TeamKey } from "@/app/types/Member";

export interface Props {
    title: string;
    description: string;
    people: readonly Member[];
    teamKey: TeamKey;
}

function memberToIcons(member: Member) {
    const icons: ReactNode[] = [];

    if (member.linkedinUrl)
        icons.push(
            <a
                key={`linkedin:${member.id}`}
                href={member.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
            >
                <Image
                    src="/icons/linkedin-plain.svg"
                    alt="Linkedin"
                    width={24}
                    height={24}
                    className="h-6 w-6"
                />
            </a>,
        );

    if (member.githubUrl)
        icons.push(
            <a
                key={`github:${member.id}`}
                href={member.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
            >
                <Image
                    src="/icons/github-plain.svg"
                    alt="GitHub"
                    width={24}
                    height={24}
                    className="h-6 w-6"
                />
            </a>,
        );

    if (member.email)
        icons.push(
            <a key={`email:${member.id}`} href={`mailto:${member.email}`} target="_blank">
                <Image
                    src="/icons/mail-plain.svg"
                    alt="Email"
                    width={24}
                    height={24}
                    className="h-6 w-6"
                />
            </a>,
        );

    if (member.portfolioUrl)
        icons.push(
            <a
                key={`portfolio:${member.id}`}
                href={member.portfolioUrl}
                target="_blank"
                rel="noopener noreferrer"
            >
                <Image
                    src="/icons/globe-plain.svg"
                    alt="Portfolio"
                    width={24}
                    height={24}
                    className="h-6 w-6"
                />
            </a>,
        );

    return icons;
}

export default function TeamMembers({ title, description, people, teamKey }: Props) {
    const t = useTranslations("about.introducing_our_team_section");

    const fallbackImage = "/imgs/team/backup.png";
    const [imgSrcs, setImgSrcs] = useState<string[]>(people.map(person => person.imageUrl));

    const handleError = (index: number) => {
        setImgSrcs(prev => {
            const next = [...prev];
            next[index] = fallbackImage;
            return next;
        });
    };

    return (
        <div className="relative">
            {/* Decorations */}
            <div className="pointer-events-none absolute top-0 left-0 h-full w-full select-none">
                <Image
                    className="fade-from-center-sponsorship-floor absolute bottom-[-4rem] left-0 w-[100rem] opacity-70 2xl:-left-20"
                    src="/decoration/waves.svg"
                    width={1258}
                    height={1872}
                    alt=""
                />
            </div>
            <div id={teamKey} className="scroll-mt-[100px]">
                <h2 className="mb-3 font-heading text-lg uppercase md:text-xl">{title}</h2>
                <p className="mb-4 max-w-md text-base text-thistle leading-tight md:text-lg">
                    {description}{" "}
                </p>
                <div className="flex gap-5 overflow-x-auto md:mt-7">
                    {people.map((person, index) => (
                        <div
                            className="flex h-[405px] w-64 min-w-64 flex-col outline-gradient backdrop-blur-lg"
                            key={`member:${title}:${person.name}`}
                        >
                            <Image
                                src={imgSrcs[index] ?? fallbackImage}
                                alt={`Picture of ${person.name}`}
                                width={256}
                                height={256}
                                className="h-64 w-64 object-cover"
                                onError={() => handleError(index)}
                            />
                            <div className="flex grow flex-col gap-2 p-4">
                                <h3 className="font-bold font-sans text-lg md:text-xl">
                                    {person.name}
                                </h3>
                                <p className="text-thistle">
                                    {t(`${person.teamKey}_${person.roleKey}`)}
                                </p>
                                <div className="mt-auto flex gap-2">{memberToIcons(person)}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
