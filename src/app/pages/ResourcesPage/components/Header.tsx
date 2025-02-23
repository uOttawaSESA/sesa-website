import React from "react";

const Header = () => (
    <div className="mb-12 text-white">
        <span className="bg-gradient-to-r from-blueviolet-100 to-darkmagenta bg-clip-text font-mono text-transparent">
            Resources
        </span>
        <h1 className="mt-4 font-heading text-4xl uppercase">
            RESOURCES{" "}
            <span className="relative inline-block">
                FOR STUDENTS BY STUDENTS
                <div className="absolute right-0 top-0 h-full w-0 animate-highlight bg-gradient-to-r from-blueviolet-100/25 to-darkmagenta/25"></div>
            </span>
        </h1>
        <p className="max-w-10xl mt-4 font-sans text-xl text-thistle">
            Our academic team actively curates free resources to support software engineering
            students in their studies.
        </p>
    </div>
);

export default Header;
