import React, { forwardRef } from "react";
import { Link } from "@/i18n/navigation";

type ButtonBaseProps = {
    variant?: "outline" | "fill" | "ghost" | "ghost-plain";
    disabled?: boolean;
    children: React.ReactNode;
    className?: string;
};

type AnchorProps = React.AnchorHTMLAttributes<HTMLAnchorElement> &
    ButtonBaseProps & {
        href: string;
        external?: boolean;
    };

type NativeButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
    ButtonBaseProps & {
        href?: undefined;
        external?: undefined;
    };

export type ButtonProps = AnchorProps | NativeButtonProps;

const Button = forwardRef<HTMLAnchorElement | HTMLButtonElement, ButtonProps>((props, ref) => {
    const { variant = "fill", className, disabled, children, ...rest } = props;

    const baseStyle = "px-6 py-3 transition-all ease-in-out";
    const disabledClass = "opacity-50 cursor-not-allowed pointer-events-none";

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

    // External link
    if ("href" in props && props.href && props.external) {
        const { href, onClick, ...anchorRest } = rest as AnchorProps;
        return (
            <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonClasses}
                ref={ref as React.Ref<HTMLAnchorElement>}
                onClick={onClick}
                {...(disabled ? {} : anchorRest)}
            >
                {children}
            </a>
        );
    }

    // Internal link
    if ("href" in props && props.href) {
        const { href, onClick, ...anchorRest } = rest as AnchorProps;
        return (
            <Link
                href={href}
                className={buttonClasses}
                ref={ref as React.Ref<HTMLAnchorElement>}
                onClick={onClick}
                {...(disabled ? {} : anchorRest)}
            >
                {children}
            </Link>
        );
    }

    // Native button
    const { type = "button", onClick, ...buttonRest } = rest as NativeButtonProps;
    return (
        <button
            type={type}
            ref={ref as React.Ref<HTMLButtonElement>}
            className={buttonClasses}
            onClick={onClick}
            disabled={disabled}
            {...buttonRest}
        >
            {children}
        </button>
    );
});

Button.displayName = "Button";

export default Button;
