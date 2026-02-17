import { type ButtonProps, buttonVariants } from "@repo/ui/components/button";
import { cn } from "@repo/ui/lib/utils";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import * as React from "react";

const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
    <nav
        aria-label="pagination"
        className={cn("mx-auto flex w-full justify-center", className)}
        {...props}
    />
);
Pagination.displayName = "Pagination";

const PaginationContent = React.forwardRef<HTMLUListElement, React.ComponentProps<"ul">>(
    ({ className, ...props }, ref) => (
        <ul ref={ref} className={cn("flex flex-row items-center gap-1", className)} {...props} />
    ),
);
PaginationContent.displayName = "PaginationContent";

const PaginationItem = React.forwardRef<HTMLLIElement, React.ComponentProps<"li">>(
    ({ className, ...props }, ref) => <li ref={ref} className={cn("", className)} {...props} />,
);
PaginationItem.displayName = "PaginationItem";

type PaginationLinkProps = {
    isActive?: boolean;
    label?: string;
    ariaLabel?: string;
} & Pick<ButtonProps, "size"> &
    React.ComponentProps<"a">;

const PaginationLink = ({ className, isActive, size = "icon", ...props }: PaginationLinkProps) => (
    <a
        aria-current={isActive ? "page" : undefined}
        className={cn(
            buttonVariants({
                variant: isActive ? "outline" : "ghost",
                size,
            }),
            className,
        )}
        {...props}
    />
);
PaginationLink.displayName = "PaginationLink";

const PaginationPrevious = ({
    className,
    label,
    ariaLabel,
    ...props
}: React.ComponentProps<typeof PaginationLink>) => {
    return (
        <PaginationLink
            aria-label={ariaLabel ?? "Go to previous page"}
            size="default"
            className={cn("flex items-center gap-2 pl-2.5", className)}
            {...props}
        >
            <ChevronLeft className="h-4 w-4" />
            {label ?? <span>{label}</span>}
        </PaginationLink>
    );
};
PaginationPrevious.displayName = "PaginationPrevious";

const PaginationNext = ({
    className,
    label,
    ariaLabel,
    ...props
}: React.ComponentProps<typeof PaginationLink>) => {
    return (
        <PaginationLink
            aria-label={ariaLabel ?? "Go to next page"}
            size="default"
            className={cn("flex items-center gap-2 pr-2.5", className)}
            {...props}
        >
            {label ?? <span>{label}</span>}
            <ChevronRight className="h-4 w-4" />
        </PaginationLink>
    );
};
PaginationNext.displayName = "PaginationNext";

interface PaginationEllipsisProps extends React.HTMLAttributes<HTMLSpanElement> {
    srLabel?: string;
}
const PaginationEllipsis = ({ className, srLabel, ...props }: PaginationEllipsisProps) => {
    return (
        <span
            aria-hidden
            className={cn("flex h-9 w-9 items-center justify-center", className)}
            {...props}
        >
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">{srLabel ?? "More pages"}</span>
        </span>
    );
};
PaginationEllipsis.displayName = "PaginationEllipsis";

export {
    Pagination,
    PaginationContent,
    PaginationLink,
    PaginationItem,
    PaginationPrevious,
    PaginationNext,
    PaginationEllipsis,
};
