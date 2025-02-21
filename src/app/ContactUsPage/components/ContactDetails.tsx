"use client";

import Image from "next/image";
import Button from "@/components/Button";

const ContactDetails = () => {
  return (
    <div className="flex-1">
      <div className="font-mono color-gradient">
        Contact us
      </div>
            <h1 className="mt-4 text-[48px] uppercase">
                Get in{" "}
                <span className="relative [background:linear-gradient(55.37deg,_rgba(136,_36,_220,_0.25),_rgba(177,_33,_97,_0.25))]">
                    Touch
                </span>
            </h1>

            <p className="mt-4 max-w-[558px] font-mono text-[20px] text-thistle">
                Questions about our organization? Interest in collaborating with us? Send a message
                to our email, or complete the inquiry form, and we’ll respond as soon as possible.
            </p>

            <Button
                className="mt-4 flex items-center gap-3 font-heading text-xl uppercase"
                style={{ width: "fit-content" }}
                onClick={() => navigator.clipboard.writeText("uottawa.sesa@gmail.com")}
            >
                uottawa.sesa@gmail.com
                <Image src="/contact-page/vector.svg" alt="Vector Icon" width={17} height={20} />
            </Button>

            <div className="mt-4 font-mono text-base text-thistle">
                <p>800 King Edward Ave,</p>
                <p>Ottawa, ON, K1N 1A2,</p>
                <p>STE 0109</p>
            </div>
        </div>
    );
};

export default ContactDetails;
