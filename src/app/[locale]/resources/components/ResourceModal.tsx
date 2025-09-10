import * as DialogPrimitive from "@radix-ui/react-dialog";
import { formatDate } from "date-fns";
import { X } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";
import type { MappedResource } from "@/server/db/schema";

interface ResourceModalProps {
    resource: MappedResource;
    isOpen: boolean;
    onClose: () => void;
}

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

// Tooltip component to display icon information
// This uses a portal to render the tooltip outside the normal DOM hierarchy
const TooltipPortal = ({
    children,
    position,
    id,
}: {
    children: React.ReactNode;
    position: { top: number; left: number };
    id?: string;
}) => {
    return createPortal(
        <div
            id={id}
            className="outline-gradient fixed z-[9999] px-3 py-1.5 text-sm text-white shadow-lg shadow-purple-500/20 backdrop-blur-xl"
            style={{ top: position.top, left: position.left }}
        >
            {children}
        </div>,
        document.body,
    );
};

export const ResourceModal = ({ resource, isOpen, onClose }: ResourceModalProps) => {
    // Tooltip state for tier
    const [showTierTooltip, setShowTierTooltip] = useState(false);
    const [tierTooltipPos, setTierTooltipPos] = useState({ top: 0, left: 0 });

    const tierTooltipId = useId();
    const updatedTooltipId = useId();

    // Tooltip state for last updated
    const [showUpdatedTooltip, setShowUpdatedTooltip] = useState(false);
    const [updatedTooltipPos, setUpdatedTooltipPos] = useState({ top: 0, left: 0 });

    const tierRef = useRef<HTMLDivElement>(null);
    const updatedRef = useRef<HTMLDivElement>(null);

    const t = useTranslations("resources");
    const tMisc = useTranslations("misc");

    // Localization helper functions for Resource attributes
    const getLocalizedFormat = (format: string) => {
        switch (format.toLowerCase()) {
            case "textbook":
                return t("filter_textbook");
            case "video":
                return t("filter_video");
            case "article":
                return t("filter_article");
            case "website":
                return t("filter_website");
            case "blog":
                return t("filter_blog");
            default:
                return format;
        }
    };
    const getLocalizedPricing = (pricing: string) => {
        switch (pricing.toLowerCase()) {
            case "free":
                return t("modal.pricing.free");
            case "freemium":
                return t("modal.pricing.freemium");
            case "paid":
                return t("modal.pricing.paid");
            default:
                return pricing;
        }
    };
    const getLocalizedCategory = (category: string) => {
        switch (category.toLowerCase()) {
            case "academic":
                return t("filter_academic");
            case "career":
                return t("filter_career");
            case "technical":
                return t("filter_technical");
            default:
                return category;
        }
    };
    const getLocalizedAccessibilityFeature = (feature: string) => {
        switch (feature.toLowerCase()) {
            case "closed captions":
            case "cc":
            case "closed captions [cc]":
                return t("modal.accessibility.closed_captions");
            case "screen reader compatible":
                return t("modal.accessibility.screen_reader_compatible");
            default:
                return feature;
        }
    };

    useEffect(() => {
        if (showTierTooltip && tierRef.current) {
            const rect = tierRef.current.getBoundingClientRect();
            setTierTooltipPos({
                top: rect.bottom + 8,
                left: rect.left + rect.width / 2 - 100,
            });
        }
    }, [showTierTooltip]);

    useEffect(() => {
        if (showUpdatedTooltip && updatedRef.current) {
            const rect = updatedRef.current.getBoundingClientRect();
            setUpdatedTooltipPos({
                top: rect.bottom + 8,
                left: rect.left + rect.width / 2 - 100,
            });
        }
    }, [showUpdatedTooltip]);

    const getIconTooltip = (icon: string) => {
        switch (icon.toUpperCase()) {
            case "LAST UPDATED":
                return "When this resource was last updated.";

            // Tier information
            case "S":
                return t("tooltip.s_tier");
            case "A":
                return t("tooltip.a_tier");
            case "B":
                return t("tooltip.b_tier");
            case "C":
                return t("tooltip.c_tier");
            default:
                return t("tooltip.default");
        }
    };

    const isFilePath = (source: string) => {
        // Check if a source is a relative path or file extension
        return (
            source.startsWith("./") ||
            source.startsWith("../") ||
            source.startsWith("/") ||
            /\.(pdf|html|htm)$/i.test(source)
        );
    };

    const renderViewer = () => {
        switch (resource.format.toLowerCase()) {
            case "textbook":
                // Check if source is a file path or external URL
                if (!resource.source) {
                    return (
                        <div className="w-full bg-gray-800 py-16 text-center text-white">
                            {t("modal.no_textbook_source")}
                        </div>
                    );
                }

                if (isFilePath(resource.source)) {
                    // Handle as embedded file/PDF
                    return (
                        <div className="aspect-video max-h-[80vh] w-full">
                            <iframe
                                src={resource.source}
                                title={resource.title}
                                className="h-full w-full"
                            />
                        </div>
                    );
                } else {
                    try {
                        // Handle as external website link (like GitHub, etc.)
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
                    } catch (e) {
                        return (
                            <div className="w-full bg-gray-800 py-16 text-center text-white">
                                {t("modal.invalid_textbook_source")} {JSON.stringify(e)}
                            </div>
                        );
                    }
                }
            case "video": {
                const youtubeId = extractYoutubeId(resource.source);
                return (
                    <div className="aspect-video w-full">
                        <iframe
                            className="h-full w-full"
                            src={`https://www.youtube.com/embed/${youtubeId}`}
                            title={resource.title}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </div>
                );
            }
            case "website":
            case "blog":
            case "article":
                if (!resource.source) {
                    return (
                        <div className="w-full bg-gray-800 py-16 text-center text-white">
                            {t("modal.no_website_url")}
                        </div>
                    );
                }

                try {
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
                } catch (e) {
                    return (
                        <div className="w-full bg-gray-800 py-16 text-center text-white">
                            {t("modal.invalid_website_url")} {JSON.stringify(e)}
                        </div>
                    );
                }
            case "list":
                return null; // handled separately under footer
            default:
                return (
                    <div className="w-full py-16 text-center text-red-400">
                        {t("modal.unsupported_format")}
                    </div>
                );
        }
    };

    return (
        <DialogPrimitive.Root
            open={isOpen}
            onOpenChange={open => {
                if (!open) onClose();
            }}
        >
            <DialogPrimitive.Portal>
                <DialogPrimitive.Content className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/10">
                    <DialogPrimitive.Overlay className="fixed z-[-1] backdrop-blur-md w-full h-full" />
                    <div className="inset-0 bg-fixed" />
                    <div className="w-full max-w-5xl">
                        {/* Header */}
                        <div className="flex items-center w-full justify-between p-4">
                            <div>
                                {/* Category Badges */}
                                <div className="mb-4 flex gap-2 font-heading text-white">
                                    <span className="cursor-pointer bg-gradient-to-r from-blueviolet-100 to-darkmagenta p-2 text-sm uppercase">
                                        {getLocalizedCategory(resource.category)}
                                    </span>
                                    {resource.course && (
                                        <span className="cursor-pointer bg-gradient-to-r from-blueviolet-100 to-darkmagenta p-2 text-sm uppercase">
                                            {resource.course}
                                        </span>
                                    )}
                                </div>
                                <DialogPrimitive.Title className="font-heading text-2xl uppercase text-white">
                                    {resource.title}
                                </DialogPrimitive.Title>
                            </div>

                            <DialogPrimitive.Close asChild>
                                <Button
                                    size="icon"
                                    variant="outline"
                                    className="mb-10 text-white"
                                    onClick={onClose}
                                >
                                    <X size={20} />
                                </Button>
                            </DialogPrimitive.Close>
                        </div>

                        {/* Format-specific Viewer (excluding list) */}
                        {renderViewer()}

                        {/* Footer */}
                        <div className="flex items-center justify-between p-4 text-sm text-thistle w-full">
                            <div className="flex flex-row flex-wrap items-center gap-4 font-[Monocode] text-sm text-thistle">
                                {/* Tier */}
                                <div
                                    className="flex items-center gap-2"
                                    ref={tierRef}
                                    role="tooltip"
                                    aria-describedby={tierTooltipId}
                                    onMouseEnter={() => setShowTierTooltip(true)}
                                    onMouseLeave={() => setShowTierTooltip(false)}
                                >
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
                                    <span className="capitalize">
                                        {getLocalizedFormat(resource.format)}
                                    </span>
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
                                    <span className="capitalize">
                                        {getLocalizedPricing(resource.pricing)}
                                    </span>
                                </div>

                                <div className="h-[14px] w-px border-r border-thistle opacity-35" />

                                {/* Language */}
                                <div className="flex items-center gap-2">
                                    <Image
                                        src="/resources-page/language.svg"
                                        alt="Language"
                                        width={20}
                                        height={20}
                                        className="h-5 w-5"
                                    />
                                    <span className="capitalize">
                                        {resource.locale.length === 2
                                            ? "bilingual"
                                            : tMisc(`lang_${resource.locale[0]}`)}
                                    </span>
                                </div>

                                {/* Accessibility Feature */}
                                {resource.accessibility && (
                                    <>
                                        <div className="h-[14px] w-px border-r border-thistle opacity-35" />

                                        <div className="flex items-center gap-2">
                                            <Image
                                                src="/resources-page/accessibility.svg"
                                                alt="Accessibility Feature"
                                                width={20}
                                                height={20}
                                                className="h-5 w-5"
                                            />
                                            {resource.accessibility.map(feature => (
                                                <span className="capitalize" key={feature}>
                                                    {getLocalizedAccessibilityFeature(feature)}
                                                </span>
                                            ))}
                                        </div>
                                    </>
                                )}

                                {/* Last Updated */}
                                {resource.updatedAt && (
                                    <>
                                        <div className="h-[14px] w-px border-r border-thistle opacity-35" />
                                        <div
                                            className="flex items-center gap-2"
                                            ref={updatedRef}
                                            role="tooltip"
                                            aria-describedby={updatedTooltipId}
                                            onMouseEnter={() => setShowUpdatedTooltip(true)}
                                            onMouseLeave={() => setShowUpdatedTooltip(false)}
                                        >
                                            <Image
                                                src="/resources-page/last-updated.svg"
                                                alt="Last Updated"
                                                width={20}
                                                height={20}
                                                className="h-5 w-5"
                                            />
                                            <span className="capitalize">
                                                {formatDate(resource.updatedAt, "PP")}
                                            </span>
                                        </div>
                                    </>
                                )}
                            </div>

                            {resource.format.toLowerCase() !== "list" && (
                                <Button
                                    className="flex flex-row items-center justify-center font-heading uppercase text-white"
                                    asChild
                                >
                                    <a
                                        href={resource.source}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Open in New Tab
                                        <span className="hidden ps-3 md:block">
                                            <Image
                                                src="/resources-page/new-tab.svg"
                                                width="15"
                                                height="15"
                                                alt="Open in a new tab"
                                            ></Image>
                                        </span>
                                    </a>
                                </Button>
                            )}
                        </div>

                        {/* Render tooltips */}
                        {showTierTooltip && (
                            <TooltipPortal id={tierTooltipId} position={tierTooltipPos}>
                                {getIconTooltip(resource.tier)}
                            </TooltipPortal>
                        )}

                        {showUpdatedTooltip && (
                            <TooltipPortal id={updatedTooltipId} position={updatedTooltipPos}>
                                {getIconTooltip("LAST UPDATED")}
                            </TooltipPortal>
                        )}
                    </div>
                </DialogPrimitive.Content>
            </DialogPrimitive.Portal>
        </DialogPrimitive.Root>
    );
};
