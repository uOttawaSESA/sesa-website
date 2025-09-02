import { useCallback, useEffect, useState } from "react";
import type { Resource } from "@/app/types/Resource";

export function useResources() {
    const [resources, setResources] = useState<Resource[]>([]); // Store fetched resources
    const [loading, setLoading] = useState<boolean>(true); // Loading state
    const [error, setError] = useState<string | null>(null); // Store error messages

    // Async fetch function
    /**
     * Fetch resources from the API
     * Handles loading and error states
     */
    const fetchResources = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await fetch("/api/resources");
            const result = await response.json();

            if (!result.success) {
                throw new Error(result.error);
            }

            setResources(result.data);
        } catch (err: unknown) {
            let message = "An unexpected error occurred";

            if (err instanceof Error) {
                message = err.message;
            }

            setError(message);
        } finally {
            setLoading(false);
        }
    }, []);

    // Fetch resources on mount
    useEffect(() => {
        fetchResources();
    }, [fetchResources]);

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
