import { resources } from "../../ResourcesPage/utils/resourcesData";
import ResourceCard from "../../ResourcesPage/components/ResourceCard";
import Marquee from "react-fast-marquee";

const Resources = () => {
    return (
        <>
            <section className="text-white md:w-full">
                <div className="mb-10 flex flex-col items-center justify-center gap-2">
                    <p className="font-monocode color-gradient">
                        Resources by students for students
                    </p>
                    <h1 className="font-heading text-4xl uppercase leading-tight">
                        Resources at your{" "}
                        <span className="relative inline-block">
                            Fingertips
                            <div className="absolute right-0 top-0 h-full w-0 animate-highlight [background:linear-gradient(55.37deg,_rgba(136,_36,_220,_0.25),_rgba(177,_33,_97,_0.25))]"></div>
                        </span>
                    </h1>
                    <p className="px-96 text-center font-sans text-xl text-thistle">
                        Our academic team actively organize free resources to support software
                        engineering students in their studies.
                    </p>
                </div>

                {/* Carousel */}
                <Marquee pauseOnHover>
                    <div className="flex flex-col gap-4">
                        {/* Two rows with gap */}
                        {/* First Row */}
                        <div className="flex gap-4">
                            {resources
                                .slice(0, Math.ceil(resources.length / 2))
                                .map((resource, index) => (
                                    <div key={index} className="mx-2">
                                        <ResourceCard
                                            title={resource.title}
                                            category={resource.category}
                                            course={resource.course}
                                            rating={resource.rating}
                                            tier={resource.tier}
                                            format={resource.format}
                                        />
                                    </div>
                                ))}
                        </div>
                        {/* Second Row */}
                        <div className="flex gap-4">
                            {resources
                                .slice(Math.ceil(resources.length / 2))
                                .map((resource, index) => (
                                    <div key={index} className="mx-2">
                                        <ResourceCard {...resource} />
                                    </div>
                                ))}
                        </div>
                    </div>
                </Marquee>
            </section>
        </>
    );
};

export default Resources;
