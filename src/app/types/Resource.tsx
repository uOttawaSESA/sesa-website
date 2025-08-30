export interface Resource {
    title: string;
    category: string;
    course?: string;
    tier: string;
    format: string;
    language: string;
    source: string;
    list?: {
        name: string;
        description: string;
        url: string;
    }[];
    pricing: string;
}
