"use client";
import { FC, useState } from "react";
import SearchFilterBar from "./components/SearchFilterBar";
import Button from "@/components/Button";
import Pagination from "./components/Pagination";
import { resources } from "./utils/resourcesData";
import Header from "./components/Header";
import ModeToggle from "./components/ModeToggle";
import RowSelector from "./components/RowSelector";
import ResourceList from "./components/ResourceList";
import Image from "next/image";

const ResourcesPage: FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsToShow, setRowsToShow] = useState(2);
    const [isGridMode, setIsGridMode] = useState(true);

    const itemsPerRow = 3;
    const totalPages = Math.ceil(resources.length / (itemsPerRow * rowsToShow));

    const currentResources = resources.slice(
        (currentPage - 1) * itemsPerRow * rowsToShow,
        currentPage * itemsPerRow * rowsToShow,
    );

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-100 via-blueviolet-200 to-[#361D49]">
            {/* Main Content Container */}
            <div className="container relative z-10 mx-auto px-4 py-8">
                <Header />
                <SearchFilterBar />

                {/* Layout and Row Selection */}
                <div className="mb-8 flex items-center justify-between">
                    {/* Grid/Row Mode Toggle (Left) */}
                    <ModeToggle isGridMode={isGridMode} setIsGridMode={setIsGridMode} />

                    {/* Row Selection Button (Right) */}
                    {isGridMode && (
                        <RowSelector rowsToShow={rowsToShow} setRowsToShow={setRowsToShow} />
                    )}
                </div>

                {/* Resources Grid or Row */}
                <ResourceList currentResources={currentResources} isGridMode={isGridMode} />

                {/* Pagination */}
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            </div>

            {/* CTA Section */}
            <div className="mt-16 flex items-center justify-center gap-6">
                <div className="flex flex-col items-center text-center">
                    <h2 className="text-l mb-8 font-heading uppercase">
                        Interested in Contributing or Requesting Resources?
                    </h2>
                </div>
                <div className="flex -translate-y-4 transform items-center justify-center">
                    <Button href="#" className="font-heading text-xl uppercase">
                        Join Our Discord
                    </Button>
                </div>
            </div>

            {/* Ange quote section */}
            <div className="my-36 flex h-[45rem] items-center justify-start gap-12 align-middle">
                {/* Grid Gradient Back */}
                <div className="grid-overlay-left md:h-[43.93rem] md:w-[53vw]"></div>

                <div className="relative z-10 lg:block">
                    <Image
                        src="/resources-page/ange-quote.png"
                        alt="SESA Group Photo"
                        className="h-[500px] w-auto object-contain"
                        width={703}
                        height={700}
                    />
                </div>

                <div className="max-w-lg text-left text-white">
                    <p className="font-heading text-2xl">
                        “TRUE EDUCATION IS BORN WHERE{" "}
                        <span className="[background:linear-gradient(55.37deg,_rgba(136,_36,_220,_0.25),_rgba(177,_33,_97,_0.25))]">
                            KNOWLEDGE MEETS ACCESSIBILITY.
                        </span>{" "}
                        SESA’S ACADEMIC TEAM IS PROUD TO STAND AT THAT INTERSECTION.”
                    </p>
                    <div className="my-3 flex items-center gap-4">
                        <Image
                            src="/imgs/team/ange.png"
                            alt="Ange Emmanuel"
                            className="h-14 w-14 rounded-full object-cover"
                            width={50}
                            height={50}
                        />
                        <div>
                            <p className="mt-4 font-bold">Ange Emmanuel</p>
                            <p className="text-sm opacity-70">Academic Lead</p>
                        </div>
                    </div>
                    {/* Call To Action Button */}
                    <div className="mt-6">
                        <Button href="#" className="font-heading text-lg uppercase">
                            Join Our Team
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResourcesPage;
