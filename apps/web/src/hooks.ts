"use client";
import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import { useEffect, useState } from "react";
import { TextInput } from "@/components/form/input";
import { Select } from "@/components/form/select";
import { Textarea } from "@/components/form/textarea";
import { Button } from "@/components/ui/button";

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

export const { fieldContext, formContext, useFieldContext } = createFormHookContexts();

export const { useAppForm } = createFormHook({
    fieldComponents: {
        TextInput,
        Select,
        Textarea,
    },
    formComponents: {
        SubmitButton: Button,
    },
    fieldContext,
    formContext,
});
