"use client";

import ContactForm from "./components/ContactForm";
import ContactDetails from "./components/ContactDetails";
// import "../globals.css";

const ContactUsPage: React.FC = () => {
    return (
        <div
            className="min-h-screen p-8 font-heading text-white"
            style={{
                background: "linear-gradient(#1B1B1B, #701BB7, #8824DC, #B1219D)",
            }}
        >
            <div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row">
                <ContactDetails />

                <div className="flex-1">
                    <ContactForm />
                </div>
            </div>
        </div>
    );
};

export default ContactUsPage;
