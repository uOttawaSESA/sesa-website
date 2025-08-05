import type Member from "@/app/types/Member";
import Image from "next/image";
import { ReactNode } from "react";

export interface Props {
    title: string;
    description: string;
    people: readonly Member[];
}

function memberToIcons(member: Member) {
    const icons: ReactNode[] = [];

    if (member.linkedin)
        icons.push(
            <a
                key={`linkedin:${member.name}`}
                href={member.linkedin}
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

    if (member.github)
        icons.push(
            <a
                key={`github:${member.name}`}
                href={member.github}
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
            <a key={`email:${member.name}`} href={`mailto:${member.email}`} target="_blank">
                <Image
                    src="/icons/mail-plain.svg"
                    alt="Email"
                    width={24}
                    height={24}
                    className="h-6 w-6"
                />
            </a>,
        );

    if (member.portfolio)
        icons.push(
            <a
                key={`portfolio:${member.name}`}
                href={member.portfolio}
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

export default function TeamMembers({ title, description, people }: Props) {
    return (
        <div id={title.toLowerCase()} className="scroll-mt-[100px]">
            <h2 className="mb-3 font-heading text-xl uppercase">{title}</h2>
            <p className="mb-4 max-w-md text-lg leading-tight text-thistle">{description} </p>
            <div className="mt-10 flex gap-5 overflow-x-auto">
                {people.map(person => (
                    <div
                        className="outline-gradient flex h-[413px] w-64 min-w-64 flex-col"
                        key={`member:${title}:${person.name}`}
                    >
                        <Image
                            src={person.imgPath}
                            alt={`Picture of ${person.name}`}
                            width={256}
                            height={256}
                            className="h-64 w-64 object-cover"
                        />
                        <div className="flex flex-grow flex-col gap-2 p-4">
                            <h3 className="font-sans text-xl font-bold">{person.name}</h3>
                            <p className="text-thistle">{person.role}</p>
                            <div className="mt-auto flex gap-2">{memberToIcons(person)}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
