import { AnchorHTMLAttributes, forwardRef } from "react";

export interface ButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
    variant?: "outline" | "fill" | "ghost";
    disabled?: boolean;
}

const Button = forwardRef<HTMLAnchorElement, ButtonProps>(
    ({ children, variant = "fill", className, disabled, ...rest }, ref) => {
        const baseStyle = "px-6 py-2";

        const disabledClass = "opacity-50 cursor-not-allowed pointer-events-none";

        switch (variant) {
            case "fill":
                return (
                    <a
                        role="button"
                        ref={ref}
                        className={`${baseStyle} fill-gradient ${className} ${disabled ? disabledClass : ""}`}
                        {...(disabled ? {} : rest)}
                    >
                        {children}
                    </a>
                );
            case "outline":
                return (
                    <a
                        role="button"
                        ref={ref}
                        className={`${baseStyle} outline-gradient ${className} ${disabled ? disabledClass : ""}`}
                        {...(disabled ? {} : rest)}
                    >
                        {children}
                    </a>
                );
            case "ghost":
                return (
                    <a
                        role="button"
                        ref={ref}
                        className={`${baseStyle} color-gradient ${className} ${disabled ? disabledClass : ""}`}
                        {...(disabled ? {} : rest)}
                    >
                        {children}
                    </a>
                );
            default:
                throw new Error(`Unknown button variant ${variant}`);
        }
    },
);

Button.displayName = "Button";

export default Button;
