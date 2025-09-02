import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
    ({ className, type, ...props }, ref) => {
        return (
            <input
                type={type}
                className={cn(
                    "outline-gradient relative min-h-[3.5rem] w-full rounded-none bg-[rgba(27,27,27,0.05)] px-3 py-2 font-sans text-[#AB9DB6] shadow-sm backdrop-blur-lg transition-[border-width,box-shadow] duration-150 ease-in-out file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-thistle focus:border-[3px] focus:shadow-[0_0_4px_rgba(255,255,255,0.4)] focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
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
