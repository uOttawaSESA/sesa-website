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
            <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
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
            <a href={member.github} target="_blank" rel="noopener noreferrer">
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
            <a href={`mailto:${member.email}`}>
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
            <a href={member.portfolio} target="_blank" rel="noopener noreferrer">
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
            <h2 className="font-heading text-2xl uppercase">{title}</h2>
            <p className="mb-4 max-w-md text-lg leading-tight text-gray-400">{description} </p>
            <div className="flex gap-2 overflow-x-scroll">
                {people.map(person => (
                    <div className="outline-gradient w-64 min-w-64" key={person.name}>
                        <Image
                            src={person.imgPath}
                            alt={`Picture of ${person.name}`}
                            width={256}
                            height={256}
                            className="h-64 w-64 object-cover"
                        />
                        <div className="flex flex-col gap-2 p-4">
                            <h3 className="font-heading text-xl uppercase">{person.name}</h3>
                            <p className="text-gray-400">{person.role}</p>
                            <div className="flex gap-2">{memberToIcons(person)}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
