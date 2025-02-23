interface DropdownMenuProps {
    items: {
        label: string;
        value: string;
        onClick: () => void;
    }[];
    isOpen: boolean;
    onItemClick: (onClick: () => void) => void;
    className?: string;
    buttonClassName?: string;
}

const gradientBorderClass = `
    border-[1px]
    border-solid
    [border-image:linear-gradient(55deg,rgba(136,36,220,0.7)_41.93%,rgba(177,33,157,0.7)_81.89%)_1]
`;

export default function Dropdown({
    items,
    isOpen,
    onItemClick,
    className = "",
    buttonClassName = "w-full px-6 py-3 text-left font-heading text-base uppercase text-white", // Add default value
}: DropdownMenuProps) {
    if (!isOpen) return null;

    return (
        <div className="absolute right-0 z-50 mt-2 min-w-full">
            <div
                className={`${gradientBorderClass} bg-[rgba(27,27,27,0.3)] backdrop-blur-md backdrop-saturate-150 ${className}`}
            >
                {items.map(item => (
                    <button
                        key={item.value}
                        onClick={() => onItemClick(item.onClick)}
                        className={`${buttonClassName} transition-colors duration-200 hover:bg-[rgba(27,27,27,0.4)]`}
                    >
                        {item.label}
                    </button>
                ))}
            </div>
        </div>
    );
}
