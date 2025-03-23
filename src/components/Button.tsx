import { AnchorHTMLAttributes, forwardRef } from "react";
import { Link } from "@/i18n/navigation";

export interface ButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
    variant?: "outline" | "fill" | "ghost" | "ghost-plain";
    disabled?: boolean;
    href?: string;
    external?: boolean;
}

const Button = forwardRef<HTMLAnchorElement, ButtonProps>(
    (
        {
            children,
            variant = "fill",
            className,
            disabled,
            href,
            external = false,
            onClick,
            ...rest
        },
        ref,
    ) => {
        const baseStyle = "px-6 py-3 transition-all ease-in-out";
        const disabledClass = "opacity-50 cursor-not-allowed pointer-events-none";

        // Determine styles based on variant
        let variantClass;
        switch (variant) {
            case "fill":
                variantClass = "fill-gradient";
                break;
            case "outline":
                variantClass = "outline-gradient";
                break;
            case "ghost":
                variantClass = "color-gradient";
                break;
            case "ghost-plain":
                variantClass = "";
                break;
            default:
                throw new Error(`Unknown button variant ${variant}`);
        }

        const buttonClasses = `${baseStyle} ${variantClass} ${className || ""} ${disabled ? disabledClass : ""}`;

        // If href is provided and it's external, use a regular anchor
        if (href && external) {
            return (
                <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={buttonClasses}
                    ref={ref}
                    onClick={onClick}
                    {...(disabled ? {} : rest)}
                >
                    {children}
                </a>
            );
        }

        // If href is provided and it's internal, use the i18n Link component without legacyBehavior
        if (href && !external) {
            return (
                <Link
                    href={href}
                    className={buttonClasses}
                    ref={ref}
                    onClick={onClick}
                    {...(disabled ? {} : rest)}
                >
                    {children}
                </Link>
            );
        }

        // If no href is provided, just return the button content
        return (
            <a
                role="button"
                ref={ref}
                className={buttonClasses}
                onClick={onClick}
                {...(disabled ? {} : rest)}
            >
                {children}
            </a>
        );
    },
);

Button.displayName = "Button";

export default Button;
