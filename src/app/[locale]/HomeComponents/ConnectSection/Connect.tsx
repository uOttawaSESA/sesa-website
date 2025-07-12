import IconButton from "@/components/IconButton";
import Image from "next/image";

const Connect = () => {
    return (
        <>
            <section className="my-36">
                <div className="flex h-[45rem] items-center justify-start gap-12 align-middle md:w-full">
                    {/* Left Image */}
                    <div className="grid-overlay-left md:h-[43.93rem] md:w-[48vw] 2xl:w-[32vw]"></div>
                    <div className="relative z-10 lg:block">
                        <Image
                            src="/imgs/Home/connectImage.webp"
                            alt="Goal Main Image"
                            className="w-full object-contain md:h-[500px] 2xl:h-[600px] 2xl:max-w-3xl"
                            width={700}
                            height={700}
                        />
                    </div>

                    <div className="max-w-2xl">
                        <p className="font-monocode relative inline-block !bg-clip-text text-left text-base text-transparent [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] [background:linear-gradient(55.37deg,_#8824dc,_#b1219d)]">
                            Connect with us
                        </p>
                        <h1 className="my-2 font-heading text-4xl uppercase leading-tight">
                            <span className="relative inline-block">
                                Connect, enage, and grow
                                <div className="absolute right-0 top-0 h-full w-0 animate-highlight [background:linear-gradient(55.37deg,_rgba(136,_36,_220,_0.25),_rgba(177,_33,_97,_0.25))]"></div>
                            </span>{" "}
                            <br />
                            with us!
                        </h1>
                        <p className="relative flex w-[35rem] items-center text-left font-sans text-xl text-thistle 2xl:w-[40rem]">
                            Join our online communities to stay up to date with our latest events,
                            announcements, and resources,
                        </p>

                        <div className="mt-6 flex justify-center gap-2 sm:justify-start">
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
