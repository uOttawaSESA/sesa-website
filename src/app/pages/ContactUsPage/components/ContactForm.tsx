"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Button from "@/components/Button";
import Dropdown from "@/components/Dropdown";

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
    const router = useRouter();

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        topic: "",
        message: "",
    });

    const [isTopicOpen, setIsTopicOpen] = useState(false);

    const topicItems = [
        {
            label: "General Inquiry",
            value: "general",
            onClick: () => {
                setFormData(prev => ({ ...prev, topic: "general" }));
                setIsTopicOpen(false);
            },
        },
        {
            label: "Partnership",
            value: "partnership",
            onClick: () => {
                setFormData(prev => ({ ...prev, topic: "partnership" }));
                setIsTopicOpen(false);
            },
        },
        {
            label: "Support",
            value: "support",
            onClick: () => {
                setFormData(prev => ({ ...prev, topic: "support" }));
                setIsTopicOpen(false);
            },
        },
    ];

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
    ) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Basic validation
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

        // Simulate form submission (replace with API call)
        console.log("Form data submitted:", formData);
        router.push("/thank-you"); // Redirect after submission
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="mb-8">
                <h2 className="font-vcr-osd-mono mb-4 text-sm text-white md:text-sm lg:text-base xl:text-base">
                    TELL US ABOUT YOURSELF
                </h2>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className={gradientBorderClass}>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            className={inputClass}
                            placeholder="First name"
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
                            placeholder="Last name"
                            required
                        />
                    </div>
                </div>
            </div>

            <div className="mb-8">
                <h2 className="font-vcr-osd-mono mb-4 text-sm text-white md:text-sm lg:text-base xl:text-base">
                    HOW CAN WE REACH YOU? (SO WE CAN REPLY TO YOU)
                </h2>

                <div className={gradientBorderClass}>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={inputClass}
                        placeholder="Email address"
                        required
                    />
                </div>
            </div>

            <div className="mb-8">
                <h2 className="font-vcr-osd-mono mb-4 text-sm text-white md:text-sm lg:text-base xl:text-base">
                    WHAT’S YOUR MESSAGE ABOUT?
                </h2>

                <div className={gradientBorderClass}>
                    <div className="relative">
                        <button
                            type="button"
                            onClick={() => setIsTopicOpen(!isTopicOpen)}
                            className={`${inputClass} flex items-center justify-between`}
                        >
                            {formData.topic
                                ? topicItems.find(item => item.value === formData.topic)?.label
                                : "Select a topic"}
                            <Image
                                src="/contact-page/arrows.svg"
                                alt="Select Arrow"
                                width={16}
                                height={16}
                                className={`transition-transform duration-200 ${
                                    isTopicOpen ? "rotate-180" : ""
                                }`}
                            />
                        </button>

                        <Dropdown
                            items={topicItems}
                            isOpen={isTopicOpen}
                            onItemClick={(onClick: () => void) => onClick()}
                            buttonClassName="w-full px-6 py-3 text-left font-sans text-base text-thistle"
                        />
                    </div>
                </div>
            </div>

            <div className="mb-8">
                <h2 className="font-vcr-osd-mono mb-4 text-sm text-white md:text-sm lg:text-base xl:text-base">
                    HOW CAN WE HELP YOU?
                </h2>

                <div className={gradientBorderClass}>
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        className={`${inputClass} md: h-48`}
                        placeholder="Include as much detail as you can"
                        required
                    />
                </div>
            </div>

            <div className="mb-8">
                <p className="font-mono text-xs text-[#AB9DB6]">
                    By submitting this form, I confirm that I have read and accept the{" "}
                    <a href="#" className="underline">
                        Privacy & Terms
                    </a>
                    .
                </p>
            </div>

            <div className="flex justify-end">
                <Button
                    type="submit"
                    className="mt-4 flex items-center gap-3 font-heading text-xl uppercase"
                >
                    Send message
                </Button>
            </div>
        </form>
    );
};

export default ContactForm;
