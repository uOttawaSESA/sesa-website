import Hero from "./HomeComponents/Hero";
import Events from "./HomeComponents/EventsSection/Events";
import Goals from "./HomeComponents/GoalsSection/Goals";
import Resources from "./HomeComponents/ResourcesSection/Resources";
import Quotes from "./HomeComponents/QuotesSection/Quotes";
import Sponsors from "./HomeComponents/SponsorSection/Sponsors";
import FAQ from "./HomeComponents/FAQ/FAQ";
import Connect from "./HomeComponents/ConnectSection/Connect";
import Team from "./HomeComponents/TeamSection/Team";

// Precompile i18n
import localeParams from "../data/locales";
export const generateStaticParams = localeParams;

const Home = () => {
    return (
        <div className="h-full bg-gray-300 font-mono text-white">
            <Hero />
            <Events />
            <Goals />
            <Resources />
            <Quotes />
            <Sponsors />
            <FAQ />
            <Connect />
            <Team />
        </div>
    );
};

export default Home;
