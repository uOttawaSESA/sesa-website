"use client";
import Image from "next/image";
import { useState } from "react";

export interface CircleImageProps
    extends Omit<React.ComponentProps<typeof Image>, "width" | "height"> {
    /** Class info to pass along to the inner image. */
    innerClassName?: string | undefined;
    /** The width and height of the image. */
    size: number | `${number}`;
}

/** A circular image with a gradient border. */
const CircleImage = ({ className, innerClassName, size, src, ...rest }: CircleImageProps) => {
    const [imgSrc, setImgSrc] = useState(src);

    const fallbackImage = "/imgs/team/backup.png";

    return (
        <div
            className={`flex h-min items-center justify-center rounded-full fill-gradient p-0.5 ${className || ""}`}
        >
            <Image
                style={{ width: `${size}px`, height: `${size}px` }}
                className={`rounded-full object-cover ${innerClassName || ""}`}
                src={imgSrc}
                onError={() => fallbackImage && setImgSrc(fallbackImage)}
                width={size}
                height={size}
                {...rest}
            />
        </div>
    );
};

export default CircleImage;
