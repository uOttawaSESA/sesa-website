import { Button } from "@/components/ui/button";
import Image from "next/image";

const Connect = () => {
    return (
        <>
            <section className="relative">
                {/* Decorations */}
                <div className="pointer-events-none z-0 select-none">
                    {/* Light gradient */}
                    <div className="fade-from-left-bg absolute top-1/2 hidden h-[70rem] w-[50vw] -translate-y-1/2 bg-blueviolet-100 bg-opacity-30 blur-sm md:block" />
                </div>
                <div className="my-8 flex flex-col gap-4 lg:my-20 lg:flex-row lg:items-center lg:gap-20 2xl:gap-52">
                    {/* Left Image */}
                    <div className="relative mb-5 mt-10 w-full max-w-2xl lg:max-w-2xl 2xl:max-w-4xl">
                        <Image
                            src="/imgs/Home/connectImage.webp"
                            alt="Goal Main Image"
                            className="relative z-10 mb-12 h-[250px] w-full object-cover sm:h-[400px] md:h-[600px] lg:mt-12 lg:h-[500px]"
                            width={700}
                            height={700}
                        />
                        <Image
                            src="/decoration/grid-mobile.svg"
                            alt=""
                            className="fade-from-top-grid-mobile absolute top-[-6.5rem] block md:hidden"
                            width={700}
                            height={700}
                        />
                        <div className="grid-overlay-left -top-12 z-0 hidden h-[350px] w-full sm:h-[500px] md:block md:h-[700px] lg:-top-12 lg:h-[43.9rem] lg:w-[53vw] xl:w-[45vw]"></div>
                    </div>

                    <div className="flex w-full flex-col gap-2 px-8 md:px-10 lg:px-8">
                        <p className="font-monocode relative inline-block !bg-clip-text text-left text-xs text-transparent [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] [background:linear-gradient(55.37deg,_#8824dc,_#b1219d)] md:text-base">
                            Connect with us
                        </p>
                        <h1 className="font-heading text-2xl uppercase leading-tight md:text-4xl">
                            <span className="highlight-text">Connect, engage, and grow</span> <br />
                            with us!
                        </h1>
                        <p className="relative text-left font-sans text-base text-thistle md:text-lg 2xl:w-[40rem]">
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
                                <a href="https://www.youtube.com/@uottawasesa527" target="_blank">
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
