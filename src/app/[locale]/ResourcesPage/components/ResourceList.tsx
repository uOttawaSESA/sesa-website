import React, { useState } from "react";
import { ResourceCard } from "./ResourceCard";
import { Resource } from "@/app/types/Resource";
import { ResourceModal } from "./ResourceModal";

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
        <>
            <div
                className={
                    isGridMode ? "mt-12 grid grid-cols-3 gap-8" : "mt-12 flex flex-col gap-8"
                }
            >
                {currentResources.map((resource, index) => (
                    <ResourceCard
                        key={index}
                        {...resource}
                        onOpen={() => openModal(resource)} // Pass trigger
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
        </>
    );
};

export default ResourceList;
