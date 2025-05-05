"use client";

// import { resources as otherResources } from "@/app/[locale]/ResourcesPage/utils/resourcesData";
import { resources as otherResources } from "@/app/data/Resources";
import ResourceCard from "@/app/[locale]/ResourcesPage/components/ResourceCard";
import IconButton from "@/components/IconButton";
import Image from "next/image";
import { useRef } from "react";

const RESOURCE_WIDTH = 350;

const OtherResources = () => {
    const items = useRef<HTMLDivElement>(null);

    const scrollItems = (direction: "left" | "right") => {
        const scrollAmount = RESOURCE_WIDTH + 8;

        if (direction === "left")
            items.current?.scrollBy({ left: -scrollAmount, behavior: "smooth" });
        else items.current?.scrollBy({ left: scrollAmount, behavior: "smooth" });
    };

    return (
        <div className="flex flex-col gap-4">
            <div className="mx-64 flex items-center justify-between">
                <h2 className="font-heading text-2xl uppercase">More Resources</h2>
                <div className="flex gap-2">
                    <IconButton variant="outline" onClick={() => scrollItems("left")}>
                        <Image
                            src="/resources-page/arrow_backword.svg"
                            width={25}
                            height={25}
                            alt="<"
                        />
                    </IconButton>
                    <IconButton variant="outline" onClick={() => scrollItems("right")}>
                        <Image
                            src="/resources-page/arrow_forward.svg"
                            width={25}
                            height={25}
                            alt=">"
                        />
                    </IconButton>
                </div>
            </div>
            <div className="other-resources-container relative">
                <div
                    ref={items}
                    className="mx-16 flex items-center gap-2 overflow-x-hidden overflow-y-hidden"
                >
                    {otherResources.map((resource, index) => (
                        <div
                            key={index}
                            style={{
                                width: `${RESOURCE_WIDTH}px`,
                                minWidth: `${RESOURCE_WIDTH}px`,
                            }}
                            className={"h-full min-h-full"}
                        >
                            <ResourceCard {...resource} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default OtherResources;
