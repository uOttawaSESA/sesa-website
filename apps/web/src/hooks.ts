"use client";
import { useEffect, useState } from "react";

/**
 * Debounce an arbitrary value.
 * @param value Value to debounce.
 * @param delay Debounce time, in milliseconds.
 */
export function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => setDebouncedValue(value), delay);

        // Cleanup if value changes before timeout
        return () => clearTimeout(handler);
    }, [value, delay]);

    return debouncedValue;
}
