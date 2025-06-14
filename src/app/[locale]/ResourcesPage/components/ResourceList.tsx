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
        <div className="md:mt-12">
            <div
                className={
                    isGridMode
                        ? "grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3"
                        : "flex flex-col gap-6"
                }
            >
                {currentResources.map((resource, index) => (
                    <ResourceCard key={index} {...resource} onOpen={() => openModal(resource)} />
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
