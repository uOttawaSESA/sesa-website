export const OpenButton = ({
    onOpen,
    className = "",
}: {
    onOpen?: () => void;
    className?: string;
}) => (
    <button
        type="button"
        onClick={e => {
            e.preventDefault();
            onOpen?.();
        }}
        className={`color-gradient-clickable md:ms-18 ms-8 font-heading text-lg transition-opacity duration-200 ease-in-out group-hover:block group-focus:block hidden ${className}`}
    >
        OPEN
    </button>
);
