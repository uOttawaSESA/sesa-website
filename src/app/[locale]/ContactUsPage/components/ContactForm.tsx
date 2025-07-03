"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useTranslations, useLocale } from "next-intl";
import ReCAPTCHA from "react-google-recaptcha";

const gradientBorderClass = `
  border-[1px]
  border-solid
  [border-image:linear-gradient(55deg,rgba(136,36,220,0.7)_41.93%,rgba(177,33,157,0.7)_81.89%)_1]
`;

const inputClass = `
  w-full 
  min-h-[3.5rem] 
  rounded-none 
  bg-[rgba(27,27,27,0.05)] 
  px-3 
  py-2 
  font-sans 
  text-[#AB9DB6]
  placeholder:text-thistle 
  focus:outline-none
  relative
`;

const ContactForm: React.FC = () => {
    const t = useTranslations("contact_us");
    const router = useRouter();
    const locale = useLocale();

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        topic: undefined as string | undefined,
        message: "",
    });

    const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState(false);

    const topicItems = [
        {
            label: "General Inquiry",
            value: "General Inquiry",
        },
        {
            label: "Partnership",
            value: "Partnership",
        },
        {
            label: "Support",
            value: "Support",
        },
    ] as const;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Submit clicked", formData, recaptchaToken);

        if (
            !formData.firstName ||
            !formData.lastName ||
            !formData.email ||
            !formData.topic ||
            !formData.message
        ) {
            alert("Please fill out all fields.");
            return;
        }

        if (!recaptchaToken) {
            alert("Please complete the reCAPTCHA.");
            return;
        }

        setSubmitting(true);

        try {
            const res = await fetch("/api/send-email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...formData, recaptchaToken }),
            });

            const data = await res.json();
            console.log("API response:", res.status, data);

            if (res.ok) {
                router.push(`/${locale}/ThankYouPage`);
            } else {
                alert("There was an error submitting the form. Please try again.");
            }
        } catch {
            alert("There was an error submitting the form. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="mb-8">
                <h2 className="font-vcr-osd-mono mb-4 text-sm uppercase text-white md:text-sm lg:text-base xl:text-base">
                    {t("form_name_label")}
                </h2>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className={gradientBorderClass}>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            className={inputClass}
                            placeholder={t("form_firstname")}
                            required
                        />
                    </div>
                    <div className={gradientBorderClass}>
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            className={inputClass}
                            placeholder={t("form_lastname")}
                            required
                        />
                    </div>
                </div>
            </div>

            <div className="mb-8">
                <h2 className="font-vcr-osd-mono mb-4 text-sm uppercase text-white md:text-sm lg:text-base xl:text-base">
                    {t("form_email_label")}
                </h2>
                <div className={gradientBorderClass}>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={inputClass}
                        placeholder={t("form_email")}
                        required
                    />
                </div>
            </div>

            <div className="mb-8">
                <h2 className="font-vcr-osd-mono mb-4 text-sm uppercase text-white md:text-sm lg:text-base xl:text-base">
                    {t("form_subject_label")}
                </h2>
                <Select
                    value={formData.topic}
                    onValueChange={topic => setFormData(prev => ({ ...prev, topic }))}
                >
                    <SelectTrigger className="min-h-[3.5rem] w-full font-sans">
                        <SelectValue placeholder={t("form_subject")} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {topicItems.map(({ label, value }) => (
                                <SelectItem key={value} value={value}>
                                    {label}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>

            <div className="mb-8">
                <h2 className="font-vcr-osd-mono mb-4 text-sm uppercase text-white md:text-sm lg:text-base xl:text-base">
                    {t("form_body_label")}
                </h2>
                <div className={gradientBorderClass}>
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        className={`${inputClass} md: h-48`}
                        placeholder={t("form_body_placeholder")}
                        required
                    />
                </div>
            </div>

            <div className="mb-8">
                <p className="font-mono text-xs text-[#AB9DB6]">
                    {t("form_disclosure")}{" "}
                    <a href="#" className="underline">
                        {t("form_disclosure_link")}
                    </a>
                    .
                </p>
            </div>

            {/* reCAPTCHA */}
            <div className="mb-8 flex justify-center">
                <ReCAPTCHA
                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
                    onChange={(token: string | null) => setRecaptchaToken(token)}
                    theme="dark"
                />
            </div>

            <div className="flex justify-center">
                <Button
                    type="submit"
                    className="mt-4 flex items-center gap-3 font-heading text-xl uppercase"
                    disabled={submitting}
                >
                    {submitting ? t("sending") : t("send_message")}
                </Button>
            </div>
        </form>
    );
};

export default ContactForm;
