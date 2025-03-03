"use client";

import Marquee from "react-fast-marquee";
import { SocialMediaCard } from "../components/SocialMediaCard";

const InfiniteCarousel = () => {
    const socialMediaPosts = [
        {
            image: "/imgs/Events/SocialMedia/desjardins.png",
            title: "UOTTAWASESA",
            description:
                "Thank you @desjardinslab and everyone that came out to our Computer Vision event last night...",
            logo: "/icons/instagram-plain.svg",
            postLink: "https://www.instagram.com/p/Bp9eQDGFnv3/",
        },
        {
            image: "/imgs/Events/SocialMedia/kinaxis2.png",
            title: "UOTTAWASESA",
            description:
                "If you didn't get a chance to attend today's event, don't worry we will have many more to come!...",
            logo: "/icons/instagram-plain.svg",
            postLink: "https://www.instagram.com/p/BaZuTxWAdPV/",
        },
        {
            image: "/imgs/Events/SocialMedia/puppytherapy.png",
            title: "UOTTAWASESA",
            description:
                "Here are some of our favorite photos from last week's Puppy Therapy! Again, huge thanks...",
            logo: "/icons/facebook-plain.svg",
            postLink:
                "https://www.facebook.com/UOttawaSESA/posts/pfbid033DqT2GBGyuJiEWKKvsUNSBLx2BfVUhsTraT8Li6gevPS3qmPuZsntHbDQEphKhgAl",
        },
        {
            image: "/imgs/Events/SocialMedia/kinaxis.png",
            title: "UOTTAWASESA",
            description:
                "Throwback to our LinkedIn Event with @kinaxis and a cool photo booth! #photobooth #kinaxis...",
            logo: "/icons/instagram-plain.svg",
            postLink: "https://www.instagram.com/p/BbBFFhvAw1-/",
        },
    ];

    return (
        <div className="my-8 overflow-hidden">
            <Marquee pauseOnHover autoFill>
                {socialMediaPosts.map((post, index) => (
                    <div key={index} className="mx-6">
                        <SocialMediaCard
                            image={post.image}
                            title={post.title}
                            description={post.description}
                            logo={post.logo}
                            postLink={post.postLink}
                        />
                    </div>
                ))}
            </Marquee>
        </div>
    );
};

export default InfiniteCarousel;
