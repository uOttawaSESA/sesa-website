import Image from "next/image";
import { Button } from "@/components/ui/button";
import { LanguageSelect } from "@/components/LanguageSelect";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

// === Removed sponsor marquee, in case we want it again: ===
// {/* Sponsors marquee */}
// {/* Implementation detail: SVG's are inlined so that the colour may be changed based on browser theme */}
// <Marquee pauseOnHover autoFill>
//     <div className="sponsor">
//         <a href="https://www.warp.dev/" target="_blank">
//             {/* prettier-ignore */}
//             <svg fill="none" height="36" viewBox="0 0 380 92" width="150" xmlns="http://www.w3.org/2000/svg"><path d="M51.0696 4.92194H88.7341C94.8309 4.92194 99.7736 10.0293 99.7736 16.3295V60.6175C99.7736 66.9179 94.8309 72.0252 88.7341 72.0252H34.835L51.0696 4.92194Z" fill="currentColor"></path><path d="M41.2866 17.6346H10.9455C4.90046 17.6346 0 22.7419 0 29.0421V73.3302C0 79.6305 4.90046 84.7378 10.9455 84.7378H48.2888L49.7863 78.495H26.6878L41.2866 17.6346Z" fill="currentColor"></path><path d="M145.001 71.9982L128.396 17.6544H137.777L149.53 59.167L162.253 17.6544H171.095L183.818 59.167L195.463 17.6544H205.06L188.347 71.9982H179.397L166.674 30.7013L153.95 71.9982H145.001ZM246.426 36.6316C246.426 29.1917 241.142 24.4474 233.163 24.4474C225.723 24.4474 220.44 28.8682 219.685 36.2003L211.167 34.583C212.784 23.8005 221.734 16.7918 233.163 16.7918C246.318 16.7918 255.483 24.5552 255.483 37.1708V71.9982H246.426V62.7253C243.299 68.9791 236.182 72.8608 228.311 72.8608C217.421 72.8608 209.981 66.1757 209.981 56.7949C209.981 46.3359 218.499 40.6211 235.859 38.896L246.426 37.7099V36.6316ZM219.146 56.6871C219.146 61.7548 223.459 65.3131 229.713 65.3131C240.28 65.3131 246.426 58.3044 246.426 47.4141V44.8263L235.859 46.0124C224.861 47.1985 219.146 50.9723 219.146 56.6871ZM317.181 36.0925L308.016 37.8177C307.584 29.7308 302.517 25.0944 294.322 25.0944C284.294 25.0944 277.825 34.1517 277.825 48.708V71.9982H268.66V17.6544H277.825V28.3291C281.814 20.5657 288.499 16.7918 296.478 16.7918C308.555 16.7918 316.75 24.3396 317.181 36.0925ZM326.95 91.6223V17.6544H336.115V25.5257C339.027 20.5657 346.143 16.7918 354.014 16.7918C370.727 16.7918 380 28.8682 380 44.8263C380 60.7844 370.512 72.8608 353.799 72.8608C346.898 72.8608 339.781 69.4104 336.115 64.4505V91.6223H326.95ZM352.936 64.6661C363.719 64.6661 370.727 56.7949 370.727 44.8263C370.727 32.8578 363.719 24.9865 352.936 24.9865C342.369 24.9865 335.361 32.8578 335.361 44.8263C335.361 56.7949 342.369 64.6661 352.936 64.6661Z" fill="currentColor"></path></svg>
//         </a>
//     </div>
//     <div className="sponsor">
//         <p className="text-4xl">SPONSOR</p>
//     </div>
// </Marquee>

export default function Footer() {
    const t = useTranslations("footer");
    const tNav = useTranslations("navigation");

    return (
        <footer className="flex justify-center">
            <div className="flex flex-col gap-2 bg-transparent px-8">
                {/* Navigation links and socials */}
                <div className="flex flex-col gap-8 md:flex-row md:justify-between lg:gap-32">
                    <div className="flex flex-col items-start gap-2 text-left">
                        <h3 className="font-heading uppercase text-white">SESA/AÉGL</h3>
                        <p className="text-thistle md:max-w-72">{t("blurb")}</p>
                        <p className="text-thistle">
                            &copy;&nbsp;2014&ndash;{new Date().getFullYear()}
                        </p>
                    </div>

                    <div className="flex flex-wrap justify-between gap-4 text-left sm:flex-nowrap lg:gap-36">
                        <div className="flex flex-col gap-4">
                            <h3 className="font-heading uppercase text-white">{t("sitemap")}</h3>
                            <ul className="flex flex-col gap-3 leading-none text-thistle">
                                <li>
                                    <Link href="/">{tNav("home")}</Link>
                                </li>
                                <li>
                                    <Link href="/AboutPage">{tNav("about")}</Link>
                                </li>
                                <li>
                                    <Link href="/EventsPage">{tNav("events")}</Link>
                                </li>
                                <li>
                                    <Link href="/ResourcesPage">{tNav("resources")}</Link>
                                </li>
                                <li>
                                    <Link href="/ContactUsPage">{tNav("contact")}</Link>
                                </li>
                                <li>
                                    <Link href="/SponsorsPage">{tNav("sponsor")}</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="flex flex-col gap-4">
                            <h3 className="font-heading uppercase text-white">{t("policies")}</h3>
                            <ul className="flex flex-col gap-3 leading-none text-thistle">
                                <li>
                                    <a href="#">{t("privacy")}</a>
                                </li>
                                <li>
                                    <a href="#">{t("terms")}</a>
                                </li>
                                <li>
                                    <a href="#">{t("constitution")}</a>
                                </li>
                            </ul>
                        </div>
                        <div className="flex flex-col gap-4">
                            <h3 className="font-heading uppercase text-white">{t("contact")}</h3>
                            <p className="break-words text-thistle">
                                <span>800 King Edward Ave,</span>
                                <br />
                                <span>Ottawa, ON, K1N 1A2,</span>
                                <br />
                                <span>STE 0109</span>
                                <br />
                                <a href="mailto:uottawa.sesa@gmail.com">uottawa.sesa@gmail.com</a>
                            </p>

                            <div className="flex items-start justify-center gap-2">
                                <Button size="icon" variant="outline" asChild>
                                    <a
                                        href="https://www.instagram.com/uottawasesa/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Image
                                            src="/icons/instagram-plain.svg"
                                            width={25}
                                            height={25}
                                            alt="Instagram Logo"
                                        />
                                    </a>
                                </Button>
                                <Button size="icon" variant="outline" asChild>
                                    <a
                                        href="https://discord.com/invite/atYdx5HHCs"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
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
                                        rel="noopener noreferrer"
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
                                    <a
                                        href="https://www.youtube.com/@uottawasesa52"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
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
                </div>
                <hr className="fill-gradient mt-6 p-[0.25px]" />
                <div className="flex items-center justify-between py-4">
                    {/* SESA logo + text */}
                    <div className="flex items-center justify-center gap-2">
                        <Image
                            className="size-10 md:size-12"
                            width="45"
                            height="45"
                            src="/sesa-logo.svg"
                            alt="SESA Logo"
                        />
                        <Image
                            className="size-20 md:size-24"
                            width="100"
                            height="20"
                            src="/logo-text.svg"
                            alt="SESA Logo Text"
                        />
                    </div>
                    <div className="flex items-center gap-2 text-sm text-white md:text-base">
                        <Button
                            variant="ghost-plain"
                            className="h-min font-heading uppercase"
                            asChild
                        >
                            <a href="#">{t("back_to_top")}</a>
                        </Button>
                        <LanguageSelect />
                    </div>
                </div>
            </div>
        </footer>
    );
}
