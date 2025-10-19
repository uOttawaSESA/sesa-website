"use client";
import { Button } from "@repo/ui/components/button";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useQueryState } from "nuqs";
import type React from "react";
import type { ResourceFilters } from "@/server/api/routers/resource";
import type { MappedResource } from "@/server/db/schema";
import { api } from "@/trpc/react";
import { ResourceCard } from "./ResourceCard/ResourceCard";
import { ResourceModal } from "./ResourceModal";

interface ResourceListProps {
    currentResources: MappedResource[];
    isGridMode: boolean;
    isFetching: boolean;
    hasNextPage: boolean;
    fetchNextPage: () => void;
    setFilterOptions: (options: ResourceFilters) => void;
    filterOptions: ResourceFilters;
}

const ResourceList: React.FC<ResourceListProps> = ({
    currentResources,
    isGridMode,
    isFetching,
    hasNextPage,
    fetchNextPage,
    setFilterOptions,
    filterOptions,
}) => {
    const t = useTranslations("resources");

    // URL-based state
    const [openResource, setOpenResource] = useQueryState("id");

    const { data: selectedResource } = api.resource.get.useQuery(
        // biome-ignore lint/style/noNonNullAssertion: The `enabled` field ensures this is non-null
        { id: openResource! },
        {
            enabled: !!openResource,
            // If the resource is part of the current page, just use that
            initialData: () => currentResources.find(resource => resource.id === openResource),
        },
    );

    const openModal = (resource: MappedResource) => {
        setOpenResource(resource.id);
    };

    const closeModal = () => {
        setOpenResource(null);
    };

    const handleBadgeClick = (type: "category" | "course", value: string) => {
        setFilterOptions({
            ...filterOptions,
            [type]: value,
        });
    };

    return (
        <>
            <div className="flex justify-center md:mt-12 md:block">
                {/* Decorations */}
                <div className="pointer-events-none select-none">
                    <Image
                        src="/decoration/floor-grid.svg"
                        className="fade-from-bottom-bg md:-bottom-18 -bottom-1 -translate-x-1/2 absolute left-1/2 z-0 h-[196px] transform object-cover object-bottom" // Reduced height crops the top
                        width={1200}
                        height={430}
                        alt=""
                    />
                </div>
                <div
                    className={
                        isGridMode
                            ? "grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3"
                            : "flex flex-col gap-6"
                    }
                >
                    {currentResources.map(resource => (
                        <ResourceCard
                            key={resource.id}
                            {...resource}
                            mode={isGridMode ? "grid" : "row"}
                            onOpen={() => openModal(resource)}
                            onBadgeClick={handleBadgeClick}
                        />
                    ))}
                </div>

                {selectedResource && (
                    <ResourceModal
                        resource={selectedResource}
                        isOpen={!!selectedResource}
                        onClose={closeModal}
                    />
                )}
            </div>
            <div className="mt-8 flex justify-center">
                {isFetching ? (
                    <p className="rounded-md px-4 py-2 font-sans text-violet-400">
                        {t("query_state.pending")}
                    </p>
                ) : hasNextPage ? (
                    <Button onClick={() => fetchNextPage()}>{t("load_more")}</Button>
                ) : (
                    <p className="rounded-md px-4 py-2 font-sans text-violet-400">
                        {t("end_of_resources")}
                    </p>
                )}
            </div>
        </>
    );
};

export default ResourceList;
