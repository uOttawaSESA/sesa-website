"use client";

import Image from "next/image";
import Button from "@/components/Button";
import GridGlobe from "./GridGlobe";

const ContactDetails = () => {
    return (
        <div className="relative flex-1">
            <div className="absolute bottom-0 left-0 h-full w-1/2">
                <GridGlobe />
            </div>

            <div className="space-y-4 md:space-y-6">
                <span className="bg-gradient-to-r from-blueviolet-100 to-darkmagenta bg-clip-text font-mono text-transparent">
                    Contact us
                </span>

                <h1 className="mt-4 font-heading text-5xl uppercase leading-tight">
                    Get in{" "}
                    <span className="relative inline-block">
                        Touch
                        <div className="absolute right-0 top-0 h-full w-0 animate-highlight bg-gradient-to-r from-blueviolet-100/25 to-darkmagenta/25"></div>
                    </span>
                </h1>

                <p className="mt-4 max-w-[558px] font-sans text-xl text-thistle">
                    Questions about our organization? Interest in collaborating with us? Send a
                    message to our email, or complete the inquiry form, and we&apos;ll respond as
                    soon as possible.
                </p>

                <Button
                    className="flex items-center gap-3 font-heading text-lg uppercase transition-opacity hover:opacity-80 md:text-xl"
                    style={{ width: "fit-content" }}
                    onClick={() => navigator.clipboard.writeText("uottawa.sesa@gmail.com")}
                >
                    uottawa.sesa@gmail.com
                    <Image
                        src="/contact-page/vector.svg"
                        alt="Vector Icon"
                        width={17}
                        height={20}
                        className="ml-2"
                    />
                </Button>

                <div className="space-y-1 font-mono text-sm text-thistle md:text-base">
                    <p>800 King Edward Ave,</p>
                    <p>Ottawa, ON, K1N 1A2,</p>
                    <p>STE 0109</p>
                </div>
            </div>
        </div>
    );
};

export default ContactDetails;
