import Button from "@/components/Button";
import CircleImage from "@/components/CircleImage";
import Metric from "@/components/Metric";
import Image from "next/image";
import { Link } from "@/i18n/navigation";

export default function AboutPage() {
    const images = [
        "/imgs/team/ange.png",
        "/imgs/team/ange.png",
        "/imgs/team/ange.png",
        "/imgs/team/ange.png",
    ];

    return (
        <div className="min-h-screen">
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
                        <Button>Meet The Team</Button>
                        <Button variant="outline">Join Our Family</Button>
                    </div>
                    <div className="flex flex-nowrap items-center">
                        {images.map((src, i) => (
                            <CircleImage
                                src={src}
                                key={i}
                                alt="Profile picture"
                                size={56}
                                className={(i & 1) == 1 ? "-m-5" : undefined}
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
                            <div className="highlight-gradient"></div>
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
                            <div className="highlight-gradient"></div>
                        </span>
                    </h1>
                    <div className="max-w-[28rem]">
                        <p className="text-gray-400">
                            <b>We&apos;re preparing the next generation</b> of software engineers
                            for the workplace by offering exciting experiences and opportunities in
                            partnership with industry professionals.
                        </p>
                    </div>
                    {/* TODO: replace this with a <Button> when it supports localized links */}
                    <Link
                        href="/sponsor-us"
                        className="fill-gradient w-fit px-6 py-3 font-heading uppercase transition-all ease-in-out"
                    >
                        Become a Sponsor
                    </Link>
                </div>
                {/* TODO: insert cards */}
                {/* Introducing our team */}
                <div className="align-center flex flex-col items-center text-center">
                    <p className="color-gradient font-mono">Introducing our team</p>
                    <h1 className="font-heading text-3xl uppercase">
                        <span className="relative inline-block">
                            Meet the people
                            <div className="highlight-gradient"></div>
                        </span>{" "}
                        who make SESA
                    </h1>
                    <p className="my-1 max-w-[32rem] text-lg leading-tight text-gray-400">
                        Meet the incredible back-end team that drives our front-end success and
                        makes everything possible.
                    </p>
                    <div className="mt-4 font-heading uppercase">
                        <Button variant="outline">Co-directors</Button>
                        <Button variant="outline">Partnerships</Button>
                        <Button variant="outline">Events</Button>
                        <Button variant="outline">Communications</Button>
                        <Button variant="outline">Development</Button>
                        <Button variant="outline">Academic</Button>
                        <Button variant="outline">Advisors</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
