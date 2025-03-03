"use client";

import Hero from "./HomeComponents/Hero";
import Events from "./HomeComponents/EventsSection/Events";

const Home = () => {
    return (
        <div className="h-full bg-gray-300 font-mono text-white">
            <Hero />
            <Events />
        </div>
    );
};

export default Home;
