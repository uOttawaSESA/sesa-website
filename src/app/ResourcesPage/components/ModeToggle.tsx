import React from "react";
import Button from "@/components/Button";

interface ModeToggleProps {
    isGridMode: boolean;
    setIsGridMode: (mode: boolean) => void;
}

const ModeToggle: React.FC<ModeToggleProps> = ({ isGridMode, setIsGridMode }) => (
    <div className="flex gap-4">
        <Button
            onClick={() => setIsGridMode(true)}
            className={`${isGridMode ? "bg-blueviolet-100 text-white" : "bg-white text-thistle"} rounded-none px-4 py-2`}
        >
            Grid Mode
        </Button>
        <Button
            onClick={() => setIsGridMode(false)}
            className={`${!isGridMode ? "bg-blueviolet-100 text-white" : "bg-white text-thistle"} rounded-none px-4 py-2`}
        >
            Row Mode
        </Button>
    </div>
);

export default ModeToggle;
