import { useState, useEffect } from "react";

export function useResources() {
    const [resources, setResources] = useState([]); // Store fetched resources
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Store error messages

    // Async fetch function
    /**
     * Fetch resources from the API
     * Handles loading and error states
     */
    const fetchResources = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await fetch("/api/resources");
            const result = await response.json();

            if (!result.success) {
                throw new Error(result.error);
            }

            setResources(result.data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Fetch resources on mount
    useEffect(() => {
        fetchResources();
    }, []);

    // Refetch resources - could used for refresh button?
    const refetch = () => {
        fetchResources();
    };

    return {
        resources,
        loading,
        error,
        refetch,
    };
}
