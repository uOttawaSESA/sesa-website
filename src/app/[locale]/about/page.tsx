import Button from "@/components/Button";
import CircleImage from "@/components/CircleImage";
import Metric from "@/components/Metric";
import Image from "next/image";

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
                        We&apos;re a student-led organization made up of nerdy tech geeks
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
                    <Metric className="w-64" figure="3500+" caption="EECS students" border />
                    <Metric className="w-64" figure="21" caption="Previous partners" border />
                    <Metric
                        className="w-64"
                        figure="2300+"
                        caption="Total event attendees"
                        border
                    />
                    <Metric className="w-64" figure="34" caption="Total events" border />
                </div>
            </div>
        </div>
    );
}
