import { forwardRef } from "react";
import Button, { ButtonProps } from "./Button";

/** A wrapper around {@link Button} to make the button square. Ideal for small icons. */
const IconButton = forwardRef<HTMLAnchorElement, ButtonProps>(
    ({ children, className, disabled, ...rest }, ref) => {
        return (
            <Button ref={ref} className={`!p-3 ${className || ""}`} disabled={disabled} {...rest}>
                {children}
            </Button>
        );
    },
);

IconButton.displayName = "IconButton";

export default IconButton;
