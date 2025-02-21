import React from "react";

interface RowSelectorProps {
    rowsToShow: number;
    setRowsToShow: (value: number) => void;
}

const RowSelector: React.FC<RowSelectorProps> = ({ rowsToShow, setRowsToShow }) => (
    <div className="flex gap-4">
        <select
            value={rowsToShow}
            onChange={e => setRowsToShow(Number(e.target.value))}
            className="rounded-none border border-gray-300 bg-blueviolet-100 px-4 py-2 text-white shadow-sm focus:outline-none"
        >
            {[1, 2, 3, 4, 5].map(rows => (
                <option key={rows} value={rows}>
                    {rows} Rows
                </option>
            ))}
        </select>
    </div>
);

export default RowSelector;
