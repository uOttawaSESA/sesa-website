import Button from "./Button";

export default function Footer() {
    return (
        <footer className="bg-gray mx-8 my-8 flex flex-col gap-4 xl:mx-32 2xl:mx-64">
            <div className="grid grid-cols-1 gap-4 text-center sm:grid-cols-2 lg:grid-cols-4">
                <div className="flex flex-col gap-4">
                    <h3 className="color-gradient font-mono">Contact</h3>
                    <p className="font-mono text-gray-400">
                        800 King Edward Ave,
                        <br />
                        Ottawa, ON, K1N 1A2,
                        <br />
                        STE 0109
                        <br />
                        uottawa.sesa@gmail.com
                    </p>
                </div>
                <div className="flex flex-col gap-4">
                    <h3 className="color-gradient font-mono">Legal</h3>
                    <ul className="flex flex-col gap-4">
                        <li>
                            <a className="font-mono text-xl uppercase" href="#">
                                Privacy Policy
                            </a>
                        </li>
                        <li>
                            <a className="font-mono text-xl uppercase" href="#">
                                Terms of Service
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="flex flex-col gap-4">
                    <h3 className="color-gradient font-mono">Navigation</h3>
                    <ul className="flex flex-col gap-4">
                        <li>
                            <a className="font-mono text-xl uppercase" href="#">
                                Team
                            </a>
                        </li>
                        <li>
                            <a className="font-mono text-xl uppercase" href="#">
                                Events
                            </a>
                        </li>
                        <li>
                            <a className="font-mono text-xl uppercase" href="#">
                                Resources
                            </a>
                        </li>
                        <li>
                            <a className="font-mono text-xl uppercase" href="#">
                                Contact
                            </a>
                        </li>
                        <li>
                            <a className="font-mono text-xl uppercase" href="#">
                                Sponsor
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="flex flex-col gap-4">
                    <h3 className="color-gradient font-mono">Socials</h3>
                    <div className="flex justify-center gap-2">
                        <Button className="!p-3">I</Button>
                        <Button className="!p-3">D</Button>
                        <Button className="!p-3">L</Button>
                        <Button className="!p-3">Y</Button>
                    </div>
                </div>
            </div>
            <p>
                &copy; 2014&ndash;{new Date().getFullYear()} uOttawa Software Engineering Student
                Association (SESA)
            </p>
        </footer>
    );
}
