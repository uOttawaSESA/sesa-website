export interface Resource {
    title: string;
    category: string;
    course?: string;
    tier: string;
    format: string;
    language: string;
    source: string; // If it is a file, put file name here
    list?: {
        name: string;
        description: string;
        url: string;
    }[];
    pricing: string;
    accessibilityFeature?: string;
    lastUpdated?: Date;
}
