import Button from "@/components/Button";

// Precompile i18n
import localeParams from "../../data/locales";
export const generateStaticParams = localeParams;

const ThankYouPage = () => {
    return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-24 text-center">
            <div className="mb-6 flex flex-row items-center gap-4">
                <span className="font-heading bg-gradient-to-r from-[#8824dc] to-[#b1219d] px-3 py-1 text-base uppercase text-white">
                    Success
                </span>
                <span className="font-heading text-base uppercase tracking-widest text-white">
                    Message Successfully Received
                </span>
            </div>
            <h1 className="font-heading mb-4 text-4xl uppercase text-white">
                <span className="relative inline-block">
                    Thank you
                    <div className="animate-highlight absolute right-0 top-0 h-full w-0 [background:linear-gradient(55.37deg,_rgba(136,_36,_220,_0.25),_rgba(177,_33,_97,_0.25))]"></div>
                </span>{" "}
                for reaching out!
            </h1>
            <p className="font-raleway text-thistle mb-8 max-w-xl text-lg">
                We’ll get back to you within 48 hours. In the meantime, check out our amazing
                sponsors who make SESA possible.
            </p>
            <div className="mb-12 flex flex-col justify-center gap-4 text-white sm:flex-row">
                <Button
                    href="/SponsorsPage"
                    className="font-heading text-lg uppercase"
                    variant="fill"
                >
                    Browse Sponsors <span className="text-white">{`>`}</span>
                </Button>
                <Button href="/" className="font-heading text-lg uppercase" variant="outline">
                    Back to Home
                </Button>
            </div>
        </div>
    );
};

export default ThankYouPage;
