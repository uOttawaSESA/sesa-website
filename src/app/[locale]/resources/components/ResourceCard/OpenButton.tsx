export const OpenButton = ({
    showOpen,
    onOpen,
    className = "",
}: {
    showOpen: boolean;
    onOpen?: () => void;
    className?: string;
}) => (
    <a
        href="#"
        onClick={e => {
            e.preventDefault();
            onOpen?.();
        }}
        className={`color-gradient-clickable md:ms-18 ms-8 font-heading text-lg transition-opacity duration-200 ease-in-out ${
            showOpen ? "md:opacity-100" : "md:opacity-0"
        } ${className}`}
    >
        OPEN
    </a>
);
