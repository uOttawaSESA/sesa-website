import Image from "next/image";
import { useState } from "react";
import { ResourceCard } from "./ResourceCard/ResourceCard";
import { ResourceModal } from "./ResourceModal";
import type React from "react";
import type { Resource } from "@/schemas/resources";

interface ResourceListProps {
    currentResources: Resource[];
    isGridMode: boolean;
}

const ResourceList: React.FC<ResourceListProps> = ({ currentResources, isGridMode }) => {
    const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = (resource: Resource) => {
        setSelectedResource(resource);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelectedResource(null);
    };

    return (
        <div className="flex justify-center md:mt-12 md:block">
            {/* Decorations */}
            <div className="pointer-events-none select-none">
                <Image
                    src="/decoration/floor-grid.svg"
                    className="fade-from-bottom-bg md:-bottom-18 absolute -bottom-1 left-1/2 z-0 h-[196px] -translate-x-1/2 transform object-cover object-bottom" // Reduced height crops the top
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
                    />
                ))}
            </div>

            {selectedResource && (
                <ResourceModal
                    resource={selectedResource}
                    isOpen={isModalOpen}
                    onClose={closeModal}
                />
            )}
        </div>
    );
};

export default ResourceList;
