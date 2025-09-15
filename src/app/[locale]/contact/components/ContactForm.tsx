"use client";
import { useTranslations } from "next-intl";
import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
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
import { Link, useRouter } from "@/i18n/navigation";
import { api } from "@/trpc/react";

const ContactForm: React.FC = () => {
    const router = useRouter();

    const t = useTranslations("contact_us");

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        topic: undefined as string | undefined,
        message: "",
    });

    const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);

    const emailMutation = api.contact.sendEmail.useMutation({
        onSuccess: () => router.push("/thank_you"),
    });

    const topicItems = [
        { label: t("topic_general"), value: "General Inquiry" },
        { label: t("topic_partnership"), value: "Partnership" },
        { label: t("topic_support"), value: "Support" },
    ] as const;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const { firstName, lastName, email, topic, message } = formData;

        if (!firstName || !lastName || !email || !topic || !message) {
            alert("Please fill out all fields.");
            return;
        }

        if (!recaptchaToken) {
            alert("Please complete the reCAPTCHA.");
            return;
        }

        emailMutation.mutate({ firstName, lastName, email, topic, message, recaptchaToken });
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
                    <SelectTrigger className="bg-transparent! cursor-pointer min-h-[3.5rem] w-full font-sans text-thistle">
                        <SelectValue placeholder={t("form_subject")} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {topicItems.map(({ label, value }) => (
                                <SelectItem className="cursor-pointer" key={value} value={value}>
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
                    <Link href="/policies" className="underline">
                        {t("form_disclosure_link")}
                    </Link>
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
                    disabled={emailMutation.isPending}
                >
                    {emailMutation.isPending ? t("sending") : t("send_message")}
                </Button>
            </div>
        </form>
    );
};

export default ContactForm;
