import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

export const SocialMediaCard = ({
    image,
    title,
    description,
    logo,
    postLink,
}: {
    image: string;
    title: string;
    description: string;
    logo: string;
    postLink: string;
}) => {
    const t = useTranslations("events");

    return (
        <div className="outline-gradient mt-10 flex h-[470px] w-[270px] flex-shrink-0 flex-col overflow-hidden shadow-lg">
            {/* Top 60% - Image */}
            <div className="h-[60%] w-full">
                <Image
                    src={image}
                    alt={title}
                    width={300}
                    height={240}
                    className="h-full w-full object-cover"
                />
            </div>

            {/* Bottom 40% - Content */}
            <div className="flex h-[40%] flex-col p-4">
                {/* Title and Logo */}
                <div className="flex items-center justify-between">
                    <h3 className="text-left font-heading text-xl">{title}</h3>
                    <div className="h-6 w-6">
                        <Image
                            src={logo}
                            alt="Social Media Logo"
                            width={32}
                            height={32}
                            className="h-full w-full object-contain"
                        />
                    </div>
                </div>

                {/* Description */}
                <p className="mt-2 flex-grow font-mono text-sm text-thistle">{description}</p>

                {/* View Post Button */}
                <div className="py- mt-auto pl-0 text-left">
                    {" "}
                    {/* mt-auto pushes the button to the bottom */}
                    <Button
                        variant="ghost"
                        className="text-l !p-0 font-heading uppercase text-blue-500 hover:underline"
                        asChild
                    >
                        <a href={postLink} target="_blank">
                            {t("btn_view_post")}
                        </a>
                    </Button>
                </div>
            </div>
        </div>
    );
};
