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

export const ResourceModal = ({ resource, isOpen, onClose }: ResourceModalProps) => {
    const renderViewer = () => {
        switch (resource.format.toLowerCase()) {
            case "pdf":
                return (
                    <div className="aspect-video w-full">
                        <iframe
                            src={resource.source}
                            title={resource.title}
                            className="h-full w-full"
                        />
                    </div>
                );
            case "video":
                return (
                    <div className="flex aspect-video w-full items-center justify-center bg-black text-white">
                        {/* TODO: Video player */}
                        <span>Video format viewer coming soon</span>
                    </div>
                );
            case "website":
                return (
                    <div className="flex aspect-video w-full items-center justify-center bg-gray-800 text-white">
                        {/* TODO: Website preview */}
                        <span>Website preview coming soon</span>
                    </div>
                );
            case "list":
                return (
                    <div className="w-full bg-gray-700 py-16 text-center text-white">
                        {/* TODO: List viewer */}
                        <span>List viewer coming soon</span>
                    </div>
                );
            default:
                return (
                    <div className="w-full py-16 text-center text-red-400">Unsupported format</div>
                );
        }
    };

    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md"
        >
            <div className="bg- fixed inset-0" />
            <DialogPanel className="relative z-10 w-full max-w-5xl overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between border-b p-4">
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
                        <h2 className="font-heading text-3xl uppercase text-white">
                            {resource.title}
                        </h2>
                    </div>

                    <IconButton variant="outline" className="mb-10 text-white" onClick={onClose}>
                        <X size={20} />
                    </IconButton>
                </div>

                {/* Format-specific Viewer */}
                {renderViewer()}

                {/* Footer */}
                <div className="flex items-center justify-between border-t p-4 text-sm text-thistle">
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

                    <Button
                        href={resource.source}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-row items-center justify-center font-heading uppercase text-white"
                    >
                        Open in New Tab
                        <span className="ps-3">
                            <Image
                                src="/icons/new-tab.svg"
                                width="15"
                                height="15"
                                alt="Open in a new tab"
                            ></Image>
                        </span>
                    </Button>
                </div>
            </DialogPanel>
        </Dialog>
    );
};
