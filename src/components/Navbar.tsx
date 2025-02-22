import Image from "next/image";
import Button from "./Button";
import Link from "next/link";

export default function Navbar() {
    return (
        <header className="bg-gray mx-8 my-8 flex justify-between [backdrop-filter:blur(100px)] xl:mx-32 2xl:mx-64">
            <div className="flex gap-4 lg:gap-8 xl:gap-16">
                <Link href="/">
                    <Image
                        className="my-0"
                        width="50"
                        height="50"
                        src="/sesa-logo.svg"
                        alt="SESA Logo"
                    />
                </Link>
                <div className="flex items-center gap-4 lg:gap-8 xl:gap-16">
                    <a className="my-4 font-heading text-xl uppercase" href="#">
                        Team
                    </a>
                    <a className="my-4 font-heading text-xl uppercase" href="#">
                        Events
                    </a>
                    <a href="/pages/ResourcesPage" className="my-4 font-heading text-xl uppercase">
                        Resources
                    </a>
                    <Link
                        href="/pages/ContactUsPage"
                        className="my-4 font-heading text-xl uppercase"
                    >
                        Contact
                    </Link>
                </div>
            </div>
            <div className="flex items-center gap-8">
                <Button href="#" className="font-heading text-xl uppercase" variant="outline">
                    Discord
                </Button>
                <Button href="#" className="font-heading text-xl uppercase">
                    Sponsor
                </Button>
            </div>
        </header>
    );
}
