import { forwardRef, HTMLAttributes } from "react";

export interface RectGradientProps extends HTMLAttributes<HTMLDivElement> {
    /**
     * The width of the border.
     * @default "2px"
     */
    width?: string | undefined;
}

/**
 * Adds a gradient rectangular border around its children.
 * Children must have an opaque background for the effect to work;
 * otherwise, it will just be a gradient fill.
 */
const RectGradient = forwardRef<HTMLDivElement, RectGradientProps>(
    ({ className, children, width, ...rest }, ref) => {
        return (
            <div
                style={{ padding: width || "2px" }}
                className={`fill-gradient h-min w-min ${className || ""}`}
                ref={ref}
                {...rest}
            >
                {children}
            </div>
        );
    },
);

RectGradient.displayName = "RectGradient";

export default RectGradient;
