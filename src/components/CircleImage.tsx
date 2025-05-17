import Image from "next/image";

export interface CircleImageProps
    extends Omit<React.ComponentProps<typeof Image>, "width" | "height"> {
    /** Class info to pass along to the inner image. */
    innerClassName?: string | undefined;
    /** The width and height of the image. */
    size: number | `${number}`;
}

/** A circular image with a gradient border. */
const CircleImage = ({ className, innerClassName, size, ...rest }: CircleImageProps) => {
    return (
        <div
            className={`fill-gradient flex h-min items-center justify-center rounded-full p-0.5 ${className || ""}`}
            {...rest}
        >
            {/* eslint-disable-next-line jsx-a11y/alt-text */}
            <Image
                style={{ width: `${size}px`, height: `${size}px` }}
                className={`rounded-full object-cover ${innerClassName || ""}`}
                {...rest}
                width={size}
                height={size}
            />
        </div>
    );
};

export default CircleImage;
