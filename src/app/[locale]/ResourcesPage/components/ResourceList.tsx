import React from "react";
import { ResourceCard } from "./ResourceCard";
import { Resource } from "../utils/resourcesData";

interface ResourceListProps {
    currentResources: Resource[];
    isGridMode: boolean;
}

const ResourceList: React.FC<ResourceListProps> = ({ currentResources, isGridMode }) => (
    <div className={isGridMode ? "mt-12 grid grid-cols-3 gap-8" : "mt-12 flex flex-col gap-8"}>
        {currentResources.map((resource, index) => (
            <ResourceCard key={index} {...resource} />
        ))}
    </div>
);

export default ResourceList;
