import { z } from "zod";

// List resource item schema
const ListItemSchema = z.object({
    name: z.string().min(1, "List item name is required"),
    description: z.string().min(1, "List item description is required"),
    url: z.url("Must be a valid URL"),
});

// Core Resource schema (for creation/updates)
export const ResourceSchema = z.object({
    title: z.string().min(1, "Title is required").max(200, "Title too long"),
    category: z.string().min(1, "Category is required"),
    course: z.string().optional(),
    tier: z.enum(["Beginner", "Intermediate", "Advanced"]),
    format: z.enum(["Video", "Article", "Course", "Book", "Tutorial", "Documentation"]),
    language: z.string().min(1, "Language is required"),
    source: z.string().min(1, "Source is required"),
    list: z.array(ListItemSchema).optional(),
    pricing: z.enum(["Free", "Paid", "Freemium"]),
    accessibilityFeature: z.string().optional(),
    lastUpdated: z.date().optional(),
});

// Schema for partial updates (all fields optional except those that shouldn't be empty)
export const PartialResourceSchema = ResourceSchema.partial();

// Schema for resource with Firebase metadata
export const ResourceDocumentSchema = ResourceSchema.extend({
    id: z.string().min(1, "ID is required"),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
});

// Schema for Firebase data (without id, with timestamps)
export const FirebaseResourceSchema = ResourceSchema.extend({
    createdAt: z.date(),
    updatedAt: z.date(),
});

// Inferred types
export type Resource = z.infer<typeof ResourceSchema>;
export type PartialResource = z.infer<typeof PartialResourceSchema>;
export type ResourceDocument = z.infer<typeof ResourceDocumentSchema>;
export type FirebaseResource = z.infer<typeof FirebaseResourceSchema>;
export type ListItem = z.infer<typeof ListItemSchema>;

// Validation helper functions
export const validateResource = (data: unknown) => ResourceSchema.parse(data);
export const validatePartialResource = (data: unknown) => PartialResourceSchema.parse(data);
export const validateResourceDocument = (data: unknown) => ResourceDocumentSchema.parse(data);

// Safe validation functions (return results instead of throwing)
export const safeValidateResource = (data: unknown) => ResourceSchema.safeParse(data);
export const safeValidatePartialResource = (data: unknown) => PartialResourceSchema.safeParse(data);
