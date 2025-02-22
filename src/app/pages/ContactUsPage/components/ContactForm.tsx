"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";

const ContactForm: React.FC = () => {
    const router = useRouter();

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        topic: "",
        message: "",
    });

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
                <h2 className="font-vcr-osd-mono mb-4 text-[20px] text-white">
                    TELL US ABOUT YOURSELF
                </h2>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            className="w-full rounded-none border border-gray-700 bg-gray-100 px-3 py-2 font-sans text-white placeholder:text-thistle focus:outline-none focus:ring-2 focus:ring-blueviolet-100"
                            placeholder="First name"
                            required
                        />
                    </div>

                    <div>
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            className="w-full rounded-none border border-gray-700 bg-gray-100 px-3 py-2 font-sans text-white placeholder:text-thistle focus:outline-none focus:ring-2 focus:ring-blueviolet-100"
                            placeholder="Last name"
                            required
                        />
                    </div>
                </div>
            </div>

            <div className="mb-8">
                <h2 className="font-vcr-osd-mono mb-4 text-[20px] text-white">
                    HOW CAN WE REACH YOU? (SO WE CAN REPLY TO YOU)
                </h2>

                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full rounded-none border border-gray-700 bg-gray-100 px-3 py-2 font-sans text-white placeholder:text-thistle focus:outline-none focus:ring-2 focus:ring-blueviolet-100"
                    placeholder="Email address"
                    required
                />
            </div>

            <div className="mb-8">
                <h2 className="font-vcr-osd-mono mb-4 text-[20px] text-white">
                    WHAT’S YOUR MESSAGE ABOUT?
                </h2>

                <select
                    name="topic"
                    value={formData.topic}
                    onChange={handleInputChange}
                    className={`w-full rounded-none border border-gray-700 bg-gray-100 px-3 py-2 font-sans placeholder:text-thistle focus:outline-none focus:ring-2 focus:ring-blueviolet-100 ${
                        formData.topic === "" ? "text-thistle" : "text-white"
                    }`}
                    required
                >
                    <option value="" className="text-thistle">
                        Select a topic
                    </option>
                    <option value="general" className="text-white">
                        General Inquiry
                    </option>
                    <option value="partnership" className="text-white">
                        Partnership
                    </option>
                    <option value="support" className="text-white">
                        Support
                    </option>
                </select>
            </div>

            <div className="mb-8">
                <h2 className="font-vcr-osd-mono mb-4 text-[20px] text-white">
                    HOW CAN WE HELP YOU?
                </h2>

                <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="h-32 w-full rounded-none border border-gray-700 bg-gray-100 px-3 py-2 font-sans text-thistle placeholder:text-thistle focus:outline-none focus:ring-2 focus:ring-blueviolet-100"
                    placeholder="Include as much detail as you can"
                    required
                />
            </div>

            <div className="mb-8">
                <p className="text-m font-heading text-white">
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
