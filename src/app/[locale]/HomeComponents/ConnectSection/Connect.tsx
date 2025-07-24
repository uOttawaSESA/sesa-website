import { Button } from "@/components/ui/button";
import Image from "next/image";

const Connect = () => {
    return (
        <>
            <section>
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-0">
                    {/* Left Image */}
                    <div className="relative my-4 lg:w-1/2">
                        <Image
                            src="/imgs/Home/connectImage.webp"
                            alt="Goal Main Image"
                            className="relative z-10 mb-12 h-[250px] w-full object-cover sm:h-[400px] md:h-[600px] lg:mt-12 lg:h-[500px]"
                            width={700}
                            height={700}
                        />
                        <div className="grid-overlay-left -top-12 z-0 h-[350px] w-full sm:h-[500px] md:h-[700px] lg:-top-12 lg:h-[43.9rem] lg:w-[53vw]"></div>
                    </div>

                    <div className="flex w-full flex-col gap-2 px-8 md:px-20 lg:max-w-xl lg:px-8">
                        <p className="font-monocode relative inline-block !bg-clip-text text-left text-base text-transparent [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] [background:linear-gradient(55.37deg,_#8824dc,_#b1219d)]">
                            Connect with us
                        </p>
                        <h1 className="font-heading text-2xl uppercase leading-tight md:text-3xl xl:text-5xl">
                            <span className="relative inline-block">
                                Connect, enage, and grow
                                <div className="absolute right-0 top-0 h-full w-0 animate-highlight [background:linear-gradient(55.37deg,_rgba(136,_36,_220,_0.25),_rgba(177,_33,_97,_0.25))]"></div>
                            </span>{" "}
                            <br />
                            with us!
                        </h1>
                        <p className="relative text-left font-sans text-base text-thistle md:text-lg xl:text-xl 2xl:w-[40rem]">
                            Join our online communities to stay up to date with our latest events,
                            announcements, and resources,
                        </p>

                        <div className="mt-4 flex justify-start gap-2">
                            <Button size="icon" variant="outline" asChild>
                                <a href="https://www.instagram.com/uottawasesa/" target="_blank">
                                    <Image
                                        src="/icons/instagram-plain.svg"
                                        width={25}
                                        height={25}
                                        alt="Instagram Logo"
                                    />
                                </a>
                            </Button>
                            <Button size="icon" variant="outline" asChild>
                                <a href="https://discord.com/invite/atYdx5HHCs" target="_blank">
                                    <Image
                                        src="/icons/discord-plain.svg"
                                        width={25}
                                        height={25}
                                        alt="Discord Logo"
                                    />
                                </a>
                            </Button>
                            <Button size="icon" variant="outline" asChild>
                                <a
                                    href="https://www.linkedin.com/company/software-engineering-students-association/"
                                    target="_blank"
                                >
                                    <Image
                                        src="/icons/linkedin-plain.svg"
                                        width={25}
                                        height={25}
                                        alt="LinkedIn Logo"
                                    />
                                </a>
                            </Button>
                            <Button size="icon" variant="outline" asChild>
                                <a href="https://www.youtube.com/@uottawasesa52" target="_blank">
                                    <Image
                                        src="/icons/youtube-plain.svg"
                                        width={25}
                                        height={25}
                                        alt="YouTube Logo"
                                    />
                                </a>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Connect;
