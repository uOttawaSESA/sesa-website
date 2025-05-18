import Button from "@/components/Button";
import CircleImage from "@/components/CircleImage";
import Metric from "@/components/Metric";
import Image from "next/image";
import TeamMembers from "./TeamMembers";
import { useMemo } from "react";
import { membersData } from "@/app/data/Members";
import WhatWeDoCard from "./WhatWeDoCard";

export default function AboutPage() {
    const images = [
        "/imgs/team/ange.png",
        "/imgs/team/ange.png",
        "/imgs/team/ange.png",
        "/imgs/team/ange.png",
    ];

    const codirectors = useMemo(
        () => membersData.filter(member => member.team === "Co-directors"),
        [],
    );
    const development = useMemo(
        () => membersData.filter(member => member.team === "Development"),
        [],
    );
    const communications = useMemo(
        () => membersData.filter(member => member.team === "Communications"),
        [],
    );
    const partnership = useMemo(
        () => membersData.filter(member => member.team === "Partnership"),
        [],
    );
    const events = useMemo(() => membersData.filter(member => member.team === "Events"), []);
    const academic = useMemo(() => membersData.filter(member => member.team === "Academic"), []);

    return (
        <div className="min-h-screen text-white">
            <div className="container relative mx-auto max-w-7xl px-4 py-8">
                {/* Upper area */}
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 font-heading text-lg uppercase">
                        <p className="fill-gradient px-2 py-0.5">Partner</p>
                        <p>Faculty of Engineering</p>
                    </div>
                    <h1 className="max-w-96 font-heading text-4xl uppercase">
                        Inspiring Future Software Engineers Since 2014
                    </h1>
                    <p className="max-w-[28rem] text-gray-400">
                        We’re a student organization dedicated to enriching SEG student life,
                        promoting software engineering, and supporting academic and professional
                        development.
                    </p>
                    <div className="my-2 flex gap-2 font-heading uppercase">
                        <Button className="font-heading uppercase">Meet The Team</Button>
                        <Button className="font-heading uppercase" variant="outline">
                            Join Our Family
                        </Button>
                    </div>
                    <div className="flex flex-nowrap items-center">
                        {images.map((src, i) => (
                            <CircleImage
                                src={src}
                                key={i}
                                alt="Profile picture"
                                size={56}
                                className={(i & 1) === 1 ? "-m-5" : undefined}
                            />
                        ))}
                    </div>
                </div>
                {/* Images (TODO) */}
                <div className="flex justify-center">
                    <Image
                        className="outline-gradient"
                        src="/does-not-exist"
                        width={1000}
                        height={500}
                        alt="Team picture"
                    />
                </div>
                {/* "Who are we" */}
                <div className="my-8 flex max-w-[28rem] flex-col gap-2 md:ml-[50%]">
                    <p className="color-gradient font-mono">Who are we?</p>
                    <h1 className="font-heading text-3xl uppercase">
                        We&apos;re a student-led organization made up of{" "}
                        <span className="relative inline-block">
                            nerdy tech geeks
                            <div className="highlight-gradient" />
                        </span>
                    </h1>
                    <p className="text-gray-400">
                        <b>Founded in 2014</b>, the Software Engineering Student Association (SESA)
                        helps students gain practical, hands-on experience, and make connections
                        while still in university.
                    </p>
                    <p className="my-2 text-gray-400">
                        <b>Partnered with the Faculty of Engineering, we address challenges</b> in
                        academic support, professional development, and engagement with the software
                        engineering industry.
                    </p>
                    <Button className="w-fit font-heading uppercase">Meet The Team</Button>
                </div>
                {/* Figures */}
                <div className="mx-16 flex items-center justify-between">
                    <Metric className="!w-64" figure="3500+" caption="EECS students" border />
                    <Metric className="!w-64" figure="21" caption="Previous partners" border />
                    <Metric
                        className="!w-64"
                        figure="2300+"
                        caption="Total event attendees"
                        border
                    />
                    <Metric className="!w-64" figure="34" caption="Total events" border />
                </div>
                {/* "What do we do" */}
                <div className="my-8 flex flex-col gap-2">
                    <p className="color-gradient font-mono">What do we do?</p>
                    <h1 className="font-heading text-3xl uppercase">
                        Where{" "}
                        <span className="relative inline-block">
                            students meet industry
                            <div className="highlight-gradient" />
                        </span>
                    </h1>
                    <div className="max-w-[28rem]">
                        <p className="text-gray-400">
                            <b>We&apos;re preparing the next generation</b> of software engineers
                            for the workplace by offering exciting experiences and opportunities in
                            partnership with industry professionals.
                        </p>
                    </div>
                    <Button href="/sponsor-us" className="w-fit font-heading uppercase">
                        Become a Sponsor &gt;
                    </Button>
                </div>
                {/* Cards for "What do we do" */}
                <div className="mb-8 flex justify-center gap-8">
                    <WhatWeDoCard
                        imageHref={null}
                        icon={
                            <Image
                                src="/icons/rocket-plain.svg"
                                width={24}
                                height={24}
                                alt="Rocket icon"
                            />
                        }
                        heading="Social Events"
                        description="We organize educational events and entertaining events, such as movie nights, dog therapy, game nights, and parties."
                        linkLabel="Discover Events"
                        linkHref="/events"
                    />
                    <WhatWeDoCard
                        imageHref={null}
                        icon={
                            <Image
                                src="/icons/school-plain.svg"
                                width={24}
                                height={24}
                                alt="School icon"
                            />
                        }
                        heading="Academic Support"
                        description="We also provide academic help, including mentorship, resources, advice, and support on coursework, projects, and exams."
                        linkLabel="Discover Resources"
                        linkHref="/resources"
                    />
                    <WhatWeDoCard
                        imageHref={null}
                        icon={
                            <Image
                                src="/icons/briefcase-plain.svg"
                                width={24}
                                height={24}
                                alt="Briefcase icon"
                            />
                        }
                        heading="Professional Development"
                        description="Additionally, we provide career development opportunities, including workshops, speaker series, and networking events."
                        linkLabel="Discover Opportunities"
                        linkHref="/placeholder"
                    />
                </div>
                {/* Introducing our team */}
                <div className="align-center flex flex-col items-center gap-2 text-center">
                    <p className="color-gradient font-mono">Introducing our team</p>
                    <h1 className="font-heading text-3xl uppercase">
                        <span className="relative inline-block">
                            Meet the people
                            <div className="highlight-gradient" />
                        </span>{" "}
                        who make SESA
                    </h1>
                    <p className="max-w-[32rem] text-lg leading-tight text-gray-400">
                        Meet the incredible back-end team that drives our front-end success and
                        makes everything possible.
                    </p>
                </div>
                {/* TODO: Add the `sticky` class once a way to make it not super ugly is found */}
                <div className="top-[5.6rem] z-10 mt-4 flex items-center justify-center font-heading uppercase backdrop-blur-sm">
                    <Button variant="outline" href="#co-directors">
                        Co-directors
                    </Button>
                    <Button variant="outline" href="#partnerships">
                        Partnerships
                    </Button>
                    <Button variant="outline" href="#events">
                        Events
                    </Button>
                    <Button variant="outline" href="#communications">
                        Communications
                    </Button>
                    <Button variant="outline" href="#development">
                        Development
                    </Button>
                    <Button variant="outline" href="#academic">
                        Academic
                    </Button>
                    <Button variant="outline" href="#advisors">
                        Advisors
                    </Button>
                </div>
                <br />
                {/* TODO: Add horizontal scrolling if the members don't all fit onscreen. */}
                <div className="flex flex-col gap-8">
                    <TeamMembers
                        title="Co-Directors"
                        description="Meet our Co-Directors, who keep everything running smoothly. They oversee projects, support the team, and make sure goals are met with a clear vision and strong collaboration."
                        people={codirectors}
                    />
                    <TeamMembers
                        title="Partnerships"
                        description="Relationship builders, collaborating with sponsors, partners, and stakeholders to drive mutual growth and opportunities."
                        people={partnership}
                    />
                    <TeamMembers
                        title="Events"
                        description="The organizers and planners, bringing our community together through impactful workshops, seminars, and conferences."
                        people={events}
                    />
                    <TeamMembers
                        title="Communications"
                        description="Creative minds driving social media, website design, and digital outreach with style and impact."
                        people={communications}
                    />
                    <TeamMembers
                        title="Development"
                        description="The tech powerhouse behind our projects, building innovative solutions and maintaining our website."
                        people={development}
                    />
                    <TeamMembers
                        title="Academic"
                        description="Experts in research and knowledge sharing, supporting educational initiatives and ensuring the quality of academic outputs."
                        people={academic}
                    />
                </div>
            </div>
            {/* Beyond SESA */}
            <div className="align-center flex flex-col items-center gap-2 text-center">
                <p className="color-gradient font-mono">Our previous partners</p>
                <h1 className="font-heading text-3xl uppercase">
                    <span className="relative inline-block">
                        Beyond SESA
                        <div className="highlight-gradient" />
                    </span>
                </h1>
                <p className="max-w-[32rem] text-lg leading-tight text-gray-400">
                    <b>Our community of past executive members spans around the globe</b>, making
                    their mark in top industries. Here are just a few places where you&apos;ll find
                    the impact of our talented network driving innovation and success.
                </p>
                <div className="flex items-center justify-center text-center">
                    <div className="grid grid-cols-4 gap-8">
                        {/* This just fills the grid with 8 Warp logos for the time being */}
                        {Array(8)
                            .fill(0)
                            .map((_, i) => (
                                <div
                                    className="outline-gradient flex h-36 w-64 items-center justify-center"
                                    key={i}
                                >
                                    <Image
                                        src="/sponsors/warp.svg"
                                        width={192}
                                        height={75}
                                        alt="Warp Logo"
                                        className="w-48"
                                    />
                                </div>
                            ))}
                    </div>
                </div>
            </div>
            {/* Be a part of our family */}
            <div className="mb-24 mt-32 flex items-center justify-center gap-8">
                <div className="flex flex-col gap-2">
                    <p className="color-gradient font-mono">Be a part of our family</p>
                    <h1 className="max-w-[28rem] font-heading text-3xl uppercase">
                        Are you passionate about{" "}
                        <span className="relative inline-block">
                            Software Engineering?
                            <div className="highlight-gradient" />
                        </span>
                    </h1>
                    <p className="max-w-[28rem] text-lg leading-tight text-gray-400">
                        <b>Turn your passion into impact</b>. Build, learn, and connect with
                        like-minded peers while helping shape the next generation of software
                        engineers.
                    </p>
                    <Button
                        href="/ContactUsPage"
                        className="my-4 w-fit font-heading uppercase"
                        disabled
                    >
                        Apply Now
                    </Button>
                    <p className="max-w-[28rem] font-mono text-gray-400">
                        We&apos;re no longer accepting applications for Winter 2025. Stay tuned for
                        Spring/Summer 2025 openings!
                    </p>
                </div>
                <Image
                    className="outline-gradient"
                    src="/does-not-exist"
                    width={800}
                    height={500}
                    alt="Team picture"
                />
            </div>
        </div>
    );
}
