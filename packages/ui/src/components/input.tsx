import { cn } from "@repo/ui/lib/utils";
import * as React from "react";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
    ({ className, type, ...props }, ref) => {
        return (
            <input
                type={type}
                className={cn(
                    "relative min-h-[3.5rem] w-full rounded-none bg-gray-300 px-3 py-2 font-sans text-[#AB9DB6] shadow-xs outline-gradient backdrop-blur-lg transition-[border-width,box-shadow] duration-150 ease-in-out file:border-0 file:bg-transparent file:font-medium file:text-foreground file:text-sm placeholder:text-thistle focus:border-[3px] focus:shadow-[0_0_4px_rgba(255,255,255,0.4)] focus:outline-hidden disabled:cursor-not-allowed disabled:opacity-50",
                    className,
                )}
                ref={ref}
                {...props}
            />
        );
    },
);
Input.displayName = "Input";

export { Input };
