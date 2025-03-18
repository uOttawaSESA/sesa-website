"use client";
import Header from "../SponsorsPage/components/Header";
import SponsorsGrid from "./components/SponsorsGrid";

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
        </>
    );
};

export default SponsorsPage;
