import Image from "next/image";
import IconButton from "./IconButton";

export default function Footer() {
    return (
        <footer className="bg-gray mx-8 my-8 xl:mx-32 2xl:mx-64">
            <div className="flex flex-col justify-between [backdrop-filter:blur(100px)] lg:flex-row">
                <div className="flex items-center justify-center gap-4">
                    <Image
                        className="my-0"
                        width="50"
                        height="50"
                        src="sesa-logo.svg"
                        alt="SESA Logo"
                    />
                    <Image
                        className="my-0"
                        width="109"
                        height="25"
                        src="logo-text.svg"
                        alt="SESA Logo Text"
                    />
                </div>
                <div className="flex flex-col items-center justify-center md:flex-row md:gap-12">
                    <a className="my-4 font-heading text-xl uppercase" href="#">
                        Team
                    </a>
                    <a className="my-4 font-heading text-xl uppercase" href="#">
                        Events
                    </a>
                    <a className="my-4 font-heading text-xl uppercase" href="#">
                        Resources
                    </a>
                    <a className="my-4 font-heading text-xl uppercase" href="#">
                        Contact
                    </a>
                    <a className="my-4 font-heading text-xl uppercase" href="#">
                        Sponsor
                    </a>
                    <a className="my-4 font-heading text-xl uppercase" href="#">
                        Privacy &amp; Terms
                    </a>
                </div>
            </div>
            <div className="flex items-center justify-between">
                <p>
                    &copy; 2014&ndash;{new Date().getFullYear()} uOttawa Software Engineering
                    Student Association (SESA)
                </p>
                <div className="flex gap-4">
                    <IconButton href="#" variant="outline">
                        {" "}
                        <Image
                            width="25"
                            height="25"
                            src="sesa-logo.svg"
                            alt="Instagram Logo"
                        />{" "}
                    </IconButton>
                    <IconButton href="#" variant="outline">
                        {" "}
                        <Image
                            width="25"
                            height="25"
                            src="sesa-logo.svg"
                            alt="Instagram Logo"
                        />{" "}
                    </IconButton>
                    <IconButton href="#" variant="outline">
                        {" "}
                        <Image
                            width="25"
                            height="25"
                            src="sesa-logo.svg"
                            alt="Instagram Logo"
                        />{" "}
                    </IconButton>
                    <IconButton href="#" variant="outline">
                        {" "}
                        <Image
                            width="25"
                            height="25"
                            src="sesa-logo.svg"
                            alt="Instagram Logo"
                        />{" "}
                    </IconButton>
                    <IconButton href="#" variant="outline">
                        {" "}
                        <Image
                            width="25"
                            height="25"
                            src="sesa-logo.svg"
                            alt="Instagram Logo"
                        />{" "}
                    </IconButton>
                    <IconButton href="#" variant="outline">
                        {" "}
                        <Image
                            width="25"
                            height="25"
                            src="sesa-logo.svg"
                            alt="Instagram Logo"
                        />{" "}
                    </IconButton>
                </div>
            </div>
        </footer>
    );
}
