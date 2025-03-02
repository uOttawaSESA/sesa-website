import CircleImage from "./CircleImage";

interface TeamBadgeStackProps {
    imgs: string[];
}

export const TeamBadgeStack: React.FC<TeamBadgeStackProps> = ({ imgs }) => {
    return (
        <div className="mt-6 flex">
            {imgs.map(img => (
                <CircleImage size={50} src={img} alt={img} className="ml-[-0.75rem]" key={img} />
            ))}
        </div>
    );
};
