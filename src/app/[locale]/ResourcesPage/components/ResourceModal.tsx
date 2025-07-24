import { Dialog, DialogPanel } from "@headlessui/react";
import { X } from "lucide-react";
import { Resource } from "@/app/types/Resource";
import Button from "@/components/Button";
import IconButton from "@/components/IconButton";
import Image from "next/image";

interface ResourceModalProps {
    resource: Resource;
    isOpen: boolean;
    onClose: () => void;
}

// component for List modal
const ListLinkCard = ({
    name,
    description,
    url,
}: {
    name: string;
    description: string;
    url: string;
}) => {
    const domain = (() => {
        try {
            return new URL(url).hostname;
        } catch {
            return "";
        }
    })();

    const favicon = `https://www.google.com/s2/favicons?sz=32&domain=${domain}`;

    return (
        <div className="outline-gradient flex items-start justify-between border bg-white/10 p-4 font-heading text-thistle backdrop-blur-super transition hover:border-thistle">
            <div className="flex flex-row gap-5">
                <Image
                    src={favicon}
                    alt={`${name} favicon`}
                    width={20}
                    height={20}
                    className="my-auto h-8 w-8 rounded object-contain"
                />
                <div className="flex flex-col gap-1">
                    <span className="w-[700px] text-base font-bold uppercase tracking-wider text-white">
                        {name}
                    </span>
                    <span className="font-sans text-base text-thistle">{description}</span>
                </div>
            </div>
            <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="color-gradient-clickable my-auto flex items-center gap-2 text-sm font-bold"
            >
                VISIT WEBSITE
                <Image
                    src="/resources-page/new-tab-gradient.svg"
                    alt="New tab"
                    width={15}
                    height={15}
                />
            </a>
        </div>
    );
};

const extractYoutubeId = (url: string): string | null => {
    try {
        const parsed = new URL(url);
        if (parsed.hostname.includes("youtube.com")) {
            return parsed.searchParams.get("v");
        } else if (parsed.hostname === "youtu.be") {
            return parsed.pathname.slice(1);
        }
    } catch {
        return null;
    }
    return null;
};

export const ResourceModal = ({ resource, isOpen, onClose }: ResourceModalProps) => {
    const renderViewer = () => {
        switch (resource.format.toLowerCase()) {
            case "pdf":
                return (
                    <div className="aspect-video max-h-[80vh] w-full">
                        <iframe
                            src={resource.source}
                            title={resource.title}
                            className="h-full w-full"
                        />
                    </div>
                );
            case "video":
                const youtubeId = extractYoutubeId(resource.source);
                return (
                    <div className="aspect-video w-full">
                        <iframe
                            className="h-full w-full"
                            src={`https://www.youtube.com/embed/${youtubeId}`}
                            title={resource.title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </div>
                );
            case "website":
                if (!resource.source) {
                    return (
                        <div className="w-full bg-gray-800 py-16 text-center text-white">
                            No website URL provided.
                        </div>
                    );
                }

                const parsed = new URL(resource.source);
                const hostname = parsed.hostname.replace("www.", "");
                const path = parsed.pathname + parsed.search;

                return (
                    <div className="outline-gradient font-raleway flex h-16 w-full items-center gap-2.5 border bg-white/10 px-6 text-lg text-thistle backdrop-blur-super">
                        <Image
                            src="/resources-page/link.svg"
                            alt="Website Link"
                            width={25}
                            height={25}
                            className="max-h-full"
                        />
                        <a
                            href={resource.source}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="truncate hover:underline"
                        >
                            <span>https://</span>
                            <b className="text-white">{hostname}</b>
                            <span>{path}</span>
                        </a>
                    </div>
                );
            case "list":
                return null; // handled separately under footer
            default:
                return (
                    <div className="w-full py-16 text-center text-red-400">Unsupported format</div>
                );
        }
    };

    const renderList = () => {
        if (resource.format.toLowerCase() !== "list" || !resource.list) return null;

        return (
            <div className="flex flex-col gap-4 p-4">
                {resource.list.map((item, index) => (
                    <ListLinkCard
                        key={index}
                        name={item.name}
                        description={item.description}
                        url={item.url}
                    />
                ))}
            </div>
        );
    };

    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-md"
        >
            <div className="inset-0 bg-fixed" />
            <DialogPanel className="relative z-10 w-full max-w-5xl overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-4">
                    <div>
                        {/* Category Badges */}
                        <div className="mb-4 flex gap-2 font-heading text-white">
                            <span className="cursor-pointer bg-gradient-to-r from-blueviolet-100 to-darkmagenta p-2 text-sm uppercase">
                                {resource.category}
                            </span>
                            {resource.course && (
                                <span className="cursor-pointer bg-gradient-to-r from-blueviolet-100 to-darkmagenta p-2 text-sm uppercase">
                                    {resource.course}
                                </span>
                            )}
                        </div>
                        <h2 className="font-heading text-2xl uppercase text-white">
                            {resource.title}
                        </h2>
                    </div>

                    <IconButton variant="outline" className="mb-10 text-white" onClick={onClose}>
                        <X size={20} />
                    </IconButton>
                </div>

                {/* Format-specific Viewer (excluding list) */}
                {renderViewer()}

                {/* Footer */}
                <div className="flex items-center justify-between p-4 text-sm text-thistle">
                    <div className="flex flex-row flex-wrap items-center gap-4 font-[Monocode] text-sm text-thistle">
                        {/* Rating */}
                        <div className="flex items-center gap-2">
                            <Image
                                src="/resources-page/thumbsup.svg"
                                alt="Thumbs Up"
                                width={20}
                                height={20}
                                className="h-5 w-5"
                            />
                            <span>{resource.rating}%</span>
                        </div>

                        {/* Spacer */}
                        <div className="h-[14px] w-px border-r border-thistle opacity-35" />

                        {/* Tier */}
                        <div className="flex items-center gap-2">
                            <Image
                                src="/resources-page/description.svg"
                                alt="Tier"
                                width={20}
                                height={20}
                                className="h-5 w-5"
                            />
                            <span>{resource.tier}</span>
                        </div>

                        <div className="h-[14px] w-px border-r border-thistle opacity-35" />

                        {/* Format */}
                        <div className="flex items-center gap-2">
                            <Image
                                src="/resources-page/folder.svg"
                                alt="Format"
                                width={20}
                                height={20}
                                className="h-5 w-5"
                            />
                            <span>{resource.format}</span>
                        </div>

                        <div className="h-[14px] w-px border-r border-thistle opacity-35" />

                        {/* Pricing */}
                        <div className="flex items-center gap-2">
                            <Image
                                src="/resources-page/pricing.svg"
                                alt="Pricing"
                                width={20}
                                height={20}
                                className="h-5 w-5"
                            />
                            <span>{resource.pricing}</span>
                        </div>

                        <div className="h-[14px] w-px border-r border-thistle opacity-35" />

                        {/* Language */}
                        <div className="flex items-center gap-2">
                            <Image
                                src="/resources-page/language.svg"
                                alt="Pricing"
                                width={20}
                                height={20}
                                className="h-5 w-5"
                            />
                            <span>{resource.language}</span>
                        </div>
                    </div>

                    {resource.format.toLowerCase() !== "list" && (
                        <Button
                            href={resource.source}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-row items-center justify-center font-heading uppercase text-white"
                            external
                        >
                            Open in New Tab
                            <span className="ps-3">
                                <Image
                                    src="/resources-page/new-tab.svg"
                                    width="15"
                                    height="15"
                                    alt="Open in a new tab"
                                ></Image>
                            </span>
                        </Button>
                    )}
                </div>

                {/* Render List under footer */}
                {renderList()}
            </DialogPanel>
        </Dialog>
    );
};
