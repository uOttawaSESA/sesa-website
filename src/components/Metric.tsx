export interface MetricProps {
    /** The figure to display, eg. `#10` or `3500+` */
    figure: string;
    /** The caption under the figure, eg. `Ranking` or `EECS students` */
    caption?: string | undefined;
    /** Whether to add a coloured border around the component */
    border?: boolean | undefined;
    /** Additional classes added to the metric container */
    className?: string | undefined;
}

const Metric = ({ figure, caption, border, className }: MetricProps) => {
    const baseStyle = "py-8 px-12 text-center w-min h-min";
    return (
        <div className={`${baseStyle} ${className || ""} ${border && "outline-gradient"}`}>
            <span className="font-heading text-3xl">{figure}</span>
            {caption && (
                <p className="whitespace-nowrap font-sans text-lg text-gray-500">{caption}</p>
            )}
        </div>
    );
};

export default Metric;
