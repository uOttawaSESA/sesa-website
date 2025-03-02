import { motion } from "framer-motion";

const GridGlobe = () => {
    return (
        <motion.div
            className="h-full w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            <svg
                viewBox="0 0 800 800"
                className="h-full w-full opacity-20"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <linearGradient id="gridGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{ stopColor: "#8824DC", stopOpacity: 0.4 }} />
                        <stop offset="100%" style={{ stopColor: "#B1219D", stopOpacity: 0.4 }} />
                    </linearGradient>
                </defs>
                <g className="animate-spin-slow">
                    {[...Array(20)].map((_, i) => (
                        <path
                            key={`v${i}`}
                            d={`M${i * 40 + 40} 0 Q400 400 ${i * 40 + 40} 800`}
                            fill="none"
                            stroke="url(#gridGradient)"
                            strokeWidth="0.5"
                        />
                    ))}
                    {[...Array(20)].map((_, i) => (
                        <path
                            key={`h${i}`}
                            d={`M0 ${i * 40 + 40} Q400 400 800 ${i * 40 + 40}`}
                            fill="none"
                            stroke="url(#gridGradient)"
                            strokeWidth="0.5"
                        />
                    ))}
                </g>
            </svg>
        </motion.div>
    );
};

export default GridGlobe;
