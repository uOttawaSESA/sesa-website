"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useTranslations, useLocale } from "next-intl";
import ReCAPTCHA from "react-google-recaptcha";

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
                    <Input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder={t("form_firstname")}
                        required
                        autoComplete="given-name"
                    />
                    <Input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder={t("form_lastname")}
                        required
                        autoComplete="family-name"
                    />
                </div>
            </div>

            <div className="mb-8">
                <h2 className="font-vcr-osd-mono mb-4 text-sm uppercase text-white md:text-sm lg:text-base xl:text-base">
                    {t("form_email_label")}
                </h2>
                <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder={t("form_email")}
                    required
                    autoComplete="email"
                />
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
                <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="h-48"
                    placeholder={t("form_body_placeholder")}
                    required
                />
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
