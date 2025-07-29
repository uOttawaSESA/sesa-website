import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
    "inline-flex place-items-center text-center font-heading text-lg uppercase transition-all ease-in-out",
    {
        variants: {
            variant: {
                default: "fill-gradient",
                outline: "outline-gradient backdrop-blur-lg",
                ghost: "color-gradient",
                "ghost-plain": "",
                link: "color-gradient hover:underline",
            },
            size: {
                default: "p-2 md:px-6 md:py-3",
                icon: "aspect-square !p-3",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    },
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button";
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        );
    },
);
Button.displayName = "Button";

export { Button, buttonVariants };
