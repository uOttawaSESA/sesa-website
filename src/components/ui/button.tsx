import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
    "group relative inline-flex place-items-center justify-center overflow-hidden text-center font-heading text-sm uppercase transition-all duration-300 ease-in-out md:text-lg",
    {
        variants: {
            variant: {
                default:
                    "fill-gradient hover:-translate-y-0.5 hover:shadow-lg hover:shadow-purple-500/25 active:translate-y-0",
                outline:
                    "outline-gradient hover:fill-gradient backdrop-blur-lg hover:-translate-y-0.5 hover:shadow-lg hover:shadow-purple-500/25 active:translate-y-0",
                ghost: "color-gradient hover:bg-gradient-to-r hover:from-purple-600/10 hover:to-pink-600/10 hover:backdrop-blur-sm",
                "ghost-plain": "hover:bg-white/5 hover:backdrop-blur-sm",
                link: "color-gradient hover:underline hover:decoration-2 hover:underline-offset-4",
            },
            size: {
                default: "px-6 py-3",
                icon: "aspect-square !p-3",
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
                ? "before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent hover:before:translate-x-full before:transition-transform before:duration-700 before:ease-out"
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
