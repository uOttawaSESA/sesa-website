import { Slot } from "@radix-ui/react-slot";
import { cn } from "@repo/ui/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const buttonVariants = cva(
    "group relative inline-flex place-items-center justify-center overflow-hidden text-center font-heading text-sm transition-all duration-300 ease-in-out disabled:pointer-events-none disabled:opacity-50 md:text-lg",
    {
        variants: {
            variant: {
                default:
                    "hover:-translate-y-0.5 fill-gradient uppercase hover:shadow-lg hover:shadow-purple-500/25 active:translate-y-0",
                outline:
                    "hover:-translate-y-0.5 uppercase outline-gradient backdrop-blur-lg hover:fill-gradient hover:shadow-lg hover:shadow-purple-500/25 active:translate-y-0",
                ghost: "color-gradient uppercase hover:bg-linear-to-r hover:from-purple-600/10 hover:to-pink-600/10 hover:backdrop-blur-xs",
                "ghost-plain": "uppercase hover:bg-white/5 hover:backdrop-blur-xs",
                link: "color-gradient uppercase hover:underline hover:decoration-2 hover:underline-offset-4",
                multiselect: "font-sans text-base text-thistle", // for multi-select
                unstyled: "",
            },
            size: {
                default: "px-6 py-3",
                icon: "aspect-square p-3!",
                sm: "px-2 py-2",
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

        // Add shimmer effect for default and outline variants
        const shimmerClasses =
            variant === "default" || variant === "outline"
                ? "before:absolute before:inset-0 before:-translate-x-full before:bg-linear-to-r before:from-transparent before:via-white/20 before:to-transparent hover:before:translate-x-full before:transition-transform before:duration-700 before:ease-out"
                : "";

        return (
            <Comp
                className={cn(buttonVariants({ variant, size }), shimmerClasses, className)}
                ref={ref}
                {...props}
            />
        );
    },
);
Button.displayName = "Button";

export { Button, buttonVariants };
