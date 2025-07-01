import IconButton from "@/components/IconButton";
import Image from "next/image";

const Connect = () => {
    return (
        <>
            <section>
                <div className="flex flex-col gap-4 px-8 md:px-20 xl:flex-row xl:items-center xl:gap-12 xl:ps-0">
                    {/* Left Image */}
                    <div className="grid-overlay-left xl:h-[38rem] xl:w-[48vw] 2xl:w-[32vw]"></div>
                    <Image
                        src="/imgs/Home/connectImage.png"
                        alt="Goal Main Image"
                        className="z-10 w-min object-contain xl:h-[500px] xl:w-[600px] 2xl:h-[600px] 2xl:max-w-3xl"
                        width={700}
                        height={700}
                    />

                    <div className="flex flex-col gap-2">
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
                            <IconButton
                                variant="outline"
                                href="https://www.instagram.com/uottawasesa/"
                                target="_blank"
                            >
                                <Image
                                    src="/icons/instagram-plain.svg"
                                    width={25}
                                    height={25}
                                    alt="Instagram Logo"
                                />
                            </IconButton>
                            <IconButton
                                variant="outline"
                                href="https://discord.com/invite/atYdx5HHCs"
                                target="_blank"
                            >
                                <Image
                                    src="/icons/discord-plain.svg"
                                    width={25}
                                    height={25}
                                    alt="Discord Logo"
                                />
                            </IconButton>
                            <IconButton
                                variant="outline"
                                href="https://www.linkedin.com/company/software-engineering-students-association/"
                                target="_blank"
                            >
                                <Image
                                    src="/icons/linkedin-plain.svg"
                                    width={25}
                                    height={25}
                                    alt="LinkedIn Logo"
                                />
                            </IconButton>
                            <IconButton
                                variant="outline"
                                href="https://www.youtube.com/@uottawasesa52"
                                target="_blank"
                            >
                                <Image
                                    src="/icons/youtube-plain.svg"
                                    width={25}
                                    height={25}
                                    alt="YouTube Logo"
                                />
                            </IconButton>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Connect;
