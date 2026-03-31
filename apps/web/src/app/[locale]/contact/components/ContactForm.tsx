"use client";

import { envClient } from "@repo/env";
import {
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@repo/ui/components/select";
import { useTranslations } from "next-intl";
import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import * as z from "zod";
import { ErrorText } from "@/components/form/error-text";
import { useAppForm } from "@/hooks";
import { Link, useRouter } from "@/i18n/navigation";
import { api } from "@/trpc/react";

const FormData = z.object({
    firstName: z.string().nonempty("Must provide a first name"),
    lastName: z.string().nonempty("Must provide a last name"),
    email: z.email(),
    topic: z.string().nonempty("Must select a topic"),
    message: z.string().nonempty("Must provide a message"),
});

// biome-ignore-start lint/correctness/noChildrenProp: Recommended by TanStack docs
const ContactForm: React.FC = () => {
    const router = useRouter();

    const t = useTranslations("contact_us");

    const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);

    const emailMutation = api.contact.sendEmail.useMutation({
        onSuccess: () => router.push("/thank_you"),
    });

    const form = useAppForm({
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            topic: undefined,
            message: "",
        } as Partial<z.infer<typeof FormData>>,
        validators: {
            onBlur: FormData,
        },
        onSubmit: ({ value }) => {
            if (!recaptchaToken) return;
            emailMutation.mutate({
                ...(value as z.infer<typeof FormData>),
                recaptchaToken,
            });
        },
        onSubmitInvalid: args => console.error(args.formApi.getAllErrors()),
    });

    const topicItems = [
        { label: t("topic_general"), value: "General Inquiry" },
        { label: t("topic_partnership"), value: "Partnership" },
        { label: t("topic_support"), value: "Support" },
    ] as const;

    return (
        <form
            onSubmit={e => {
                e.preventDefault();
                form.handleSubmit();
            }}
            className="space-y-6"
        >
            <div className="mb-8">
                <h2 className="mb-4 font-vcr-osd-mono text-sm text-white uppercase md:text-sm lg:text-base xl:text-base">
                    {t("form_name_label")}
                </h2>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <form.AppField
                        name="firstName"
                        children={field => (
                            <div>
                                <field.TextInput
                                    type="text"
                                    placeholder={t("form_firstname")}
                                    autoComplete="given-name"
                                    aria-invalid={!field.state.meta.isValid}
                                    required
                                />
                                <ErrorText field={field} />
                            </div>
                        )}
                    />
                    <form.AppField
                        name="lastName"
                        children={field => (
                            <div>
                                <field.TextInput
                                    type="text"
                                    placeholder={t("form_lastname")}
                                    autoComplete="family-name"
                                    aria-invalid={!field.state.meta.isValid}
                                    required
                                />
                                <ErrorText field={field} />
                            </div>
                        )}
                    />
                </div>
            </div>

            <div className="mb-8">
                <h2 className="mb-4 font-vcr-osd-mono text-sm text-white uppercase md:text-sm lg:text-base xl:text-base">
                    {t("form_email_label")}
                </h2>
                <form.AppField
                    name="email"
                    children={field => (
                        <>
                            <field.TextInput
                                type="email"
                                placeholder={t("form_email")}
                                autoComplete="email"
                                aria-invalid={!field.state.meta.isValid}
                                required
                            />
                            <ErrorText field={field} />
                        </>
                    )}
                />
            </div>

            <div className="mb-8">
                <h2 className="mb-4 font-vcr-osd-mono text-sm text-white uppercase md:text-sm lg:text-base xl:text-base">
                    {t("form_subject_label")}
                </h2>
                <form.AppField
                    name="topic"
                    children={field => (
                        <field.Select>
                            <SelectTrigger
                                className="min-h-14 w-full cursor-pointer bg-transparent! font-sans text-thistle"
                                aria-invalid={!field.state.meta.isValid}
                                onBlur={field.handleBlur}
                            >
                                <SelectValue placeholder={t("form_subject")} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {topicItems.map(({ label, value }) => (
                                        <SelectItem
                                            className="cursor-pointer"
                                            key={value}
                                            value={value}
                                        >
                                            {label}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </field.Select>
                    )}
                />
            </div>

            <div className="mb-8">
                <h2 className="mb-4 font-vcr-osd-mono text-sm text-white uppercase md:text-sm lg:text-base xl:text-base">
                    {t("form_body_label")}
                </h2>
                <form.AppField
                    name="message"
                    children={field => (
                        <>
                            <field.Textarea
                                name="message"
                                className="h-48"
                                placeholder={t("form_body_placeholder")}
                                required
                            />
                            <ErrorText field={field} />
                        </>
                    )}
                />
            </div>

            <div className="mb-8">
                <p className="font-mono text-[#AB9DB6] text-xs">
                    {t("form_disclosure")}{" "}
                    <Link href="/policies" className="underline">
                        {t("form_disclosure_link")}
                    </Link>
                </p>
            </div>

            {/* reCAPTCHA */}
            <div className="mb-8 flex justify-center">
                <ReCAPTCHA
                    sitekey={envClient.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                    onChange={(token: string | null) => setRecaptchaToken(token)}
                    theme="dark"
                />
            </div>

            <div className="flex justify-center">
                <form.AppForm>
                    <form.SubmitButton
                        type="submit"
                        className="mt-4 flex items-center gap-3 font-heading text-xl uppercase"
                        disabled={emailMutation.isPending}
                    >
                        {emailMutation.isPending ? t("sending") : t("send_message")}
                    </form.SubmitButton>
                </form.AppForm>
            </div>
        </form>
    );
};
// biome-ignore-end lint/correctness/noChildrenProp: Recommended by TanStack docs

export default ContactForm;
