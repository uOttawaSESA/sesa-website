# Description

<!-- Summarize the changes made in this PR. If it closes an issue, use "Closes #issue" to link it -->

# Checklist

Check off any applicable boxes for the change being made.

## Frontend

- [ ] I have made sure that any user-facing text uses **translation keys** rather than being hard-coded
- [ ] All of my translations have been peer-reviewed <!-- This can be left unchecked until we have an initial site-wide translation -->
- [ ] Any new or modified pages **do not** have `"use client"` in `page.tsx` <!-- Client-side parts of a page belong in their own files -->
- [ ] Any new or modified pages use SSG for i18n keys via the following snippet:
    ```typescript
    // Precompile i18n
    import localeParams from "@/app/data/locales";
    export const generateStaticParams = localeParams;
    ```
- [ ] Any new or modified pages export a metadata key

## Backend

- [ ] API request bodies are validated with Zod
- [ ] Sensitive configuration is managed through environment variables
- [ ] Inputs and outputs are properly sanitized where relevant (eg. DOMPurify for untrusted HTML)
