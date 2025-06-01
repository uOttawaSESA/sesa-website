import Header from "../SponsorsPage/components/Header";
import Benefits from "./components/Benefits";
import CTA from "./components/CTA";
import PastCollaboratorsCarousel from "./components/PastCollaboratorsCarousel";
import SponsorCard from "./components/SponsorCard";
import SponsorsGrid from "./components/SponsorsGrid";

// Precompile i18n
import localeParams from "../../data/locales";
export const generateStaticParams = localeParams;

const SponsorsPage = () => {
    return (
        <>
            <Header
                topText="Sponsor & partners"
                title="HUGE THANKS TO OUR GENEROUS SPONSORS AND PARTNERS"
                bottomText="Our incredible partnerships make SESA possible at uOttawa. Thank you for believing in our mission!"
                btn1="Become a sponsor"
                btn2="View Benefits"
            />
            <SponsorsGrid />
            <CTA />
            <SponsorCard />
            <PastCollaboratorsCarousel />
            <Benefits />
        </>
    );
};

export default SponsorsPage;
