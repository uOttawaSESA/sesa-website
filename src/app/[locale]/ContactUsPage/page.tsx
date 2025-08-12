import ContactForm from "./components/ContactForm";
import ContactDetails from "./components/ContactDetails";

// Precompile i18n
import localeParams from "@/app/data/locales";
export const generateStaticParams = localeParams;

const ContactUsPage: React.FC = () => {
    return (
        <div className="relative min-h-screen">
            <div className="absolute inset-0" />

            <div className="md:pt-26 relative px-8 pb-16 pt-10 font-heading text-white md:px-12 md:pb-20 md:pt-24 lg:px-16 xl:px-24">
                <div className="mx-auto flex max-w-7xl flex-col gap-12 md:flex-row md:gap-16">
                    <div className="flex flex-1 justify-center">
                        <ContactDetails />
                    </div>
                    <div className="flex-1">
                        <ContactForm />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUsPage;
