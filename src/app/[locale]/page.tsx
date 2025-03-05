"use client";

import Hero from "./HomeComponents/Hero";
import Events from "./HomeComponents/EventsSection/Events";
import Goals from "./HomeComponents/GoalsSection/Goals";

const Home = () => {
    return (
        <div className="h-full bg-gray-300 font-mono text-white">
            <Hero />
            <Events />
            <Goals />
        </div>
    );
};

export default Home;
