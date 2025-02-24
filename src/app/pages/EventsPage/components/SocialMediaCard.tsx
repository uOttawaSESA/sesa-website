"use client";

import Image from "next/image";
import Button from "@/components/Button";

export const SocialMediaCard = ({
    image,
    title,
    description,
    logo,
    postLink,
}: {
    image: string;
    title: string;
    description: string;
    logo: string;
    postLink: string;
}) => {
    return (
        <div className="mt-10 flex h-[400px] w-[300px] flex-shrink-0 flex-col overflow-hidden rounded-lg border border-gray-200 shadow-lg">
            {/* Top 60% - Image */}
            <div className="h-[60%] w-full">
                <Image
                    src={image}
                    alt={title}
                    width={300}
                    height={240}
                    className="h-full w-full object-cover"
                />
            </div>

            {/* Bottom 40% - Content */}
            <div className="flex h-[40%] flex-col p-4">
                {/* Title and Logo */}
                <div className="flex items-center justify-between">
                    <h3 className="text-left font-heading text-xl">{title}</h3>
                    <div className="h-6 w-6">
                        <Image
                            src={logo}
                            alt="Social Media Logo"
                            width={32}
                            height={32}
                            className="h-full w-full object-contain"
                        />
                    </div>
                </div>

                {/* Description */}
                <p className="mt-2 flex-grow font-mono text-sm text-thistle">{description}</p>

                {/* View Post Button */}
                <div className="mt-auto pl-0 text-left">
                    {" "}
                    {/* mt-auto pushes the button to the bottom */}
                    <Button
                        variant="ghost"
                        className="!p-0 font-heading text-sm uppercase text-blue-500 hover:underline"
                        href={postLink}
                        target="_blank"
                    >
                        View Post
                    </Button>
                </div>
            </div>
        </div>
    );
};
