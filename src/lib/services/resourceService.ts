import { collection, getDocs, doc, getDoc, addDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";
import { ZodError } from "zod";
import {
    Resource,
    PartialResource,
    ResourceDocument,
    ResourceSchema,
    PartialResourceSchema,
} from "../validation/resourceValidation";

const COLLECTION_NAME = "Resources";

// Custom error classes for better error handling
export class ValidationError extends Error {
    constructor(
        message: string,
        public details?: Record<string, string[]>,
    ) {
        super(message);
        this.name = "ValidationError";
    }
}

export class ResourceNotFoundError extends Error {
    constructor(id: string) {
        super(`Resource with ID ${id} not found`);
        this.name = "ResourceNotFoundError";
    }
}

export const resourceService = {
    // Get all resources
    async getAllResources(): Promise<ResourceDocument[]> {
        try {
            const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
            return querySnapshot.docs.map(doc => {
                const data = doc.data();

                // Convert Firestore timestamps to dates if they exist
                const processedData = {
                    ...data,
                    createdAt: data.createdAt?.toDate?.() || data.createdAt,
                    updatedAt: data.updatedAt?.toDate?.() || data.updatedAt,
                    lastUpdated: data.lastUpdated?.toDate?.() || data.lastUpdated,
                };

                return {
                    id: doc.id,
                    ...processedData,
                } as ResourceDocument;
            });
        } catch (error) {
            console.error("Error fetching resources:", error);
            throw new Error("Failed to fetch resources");
        }
    },

    // Get single resource by ID
    async getResourceById(id: string): Promise<ResourceDocument> {
        try {
            // Validate ID
            if (!id || typeof id !== "string" || id.trim() === "") {
                throw new ValidationError("Valid resource ID is required");
            }

            const docRef = doc(db, COLLECTION_NAME, id);
            const docSnap = await getDoc(docRef);

            if (!docSnap.exists()) {
                throw new ResourceNotFoundError(id);
            }

            const data = docSnap.data();
            const processedData = {
                ...data,
                createdAt: data.createdAt?.toDate?.() || data.createdAt,
                updatedAt: data.updatedAt?.toDate?.() || data.updatedAt,
                lastUpdated: data.lastUpdated?.toDate?.() || data.lastUpdated,
            };

            return {
                id: docSnap.id,
                ...processedData,
            } as ResourceDocument;
        } catch (error) {
            console.error("Error fetching resource:", error);
            // Re-throw custom errors
            if (error instanceof ResourceNotFoundError || error instanceof ValidationError) {
                throw error;
            }
            throw new Error("Failed to fetch resource");
        }
    },

    // Add new resource with validation
    async createResource(resourceData: Resource): Promise<ResourceDocument> {
        try {
            // Validate the input data using Resource schema
            const validatedData: Resource = ResourceSchema.parse(resourceData);

            const docRef = await addDoc(collection(db, COLLECTION_NAME), {
                ...validatedData,
                createdAt: new Date(),
                updatedAt: new Date(),
            });

            return {
                id: docRef.id,
                ...validatedData,
                createdAt: new Date(),
                updatedAt: new Date(),
            };
        } catch (error) {
            console.error("Error creating resource:", error);

            // Handle Zod validation errors
            if (error instanceof ZodError) {
                throw new ValidationError(
                    "Invalid resource data provided",
                    error.flatten().fieldErrors,
                );
            }

            throw new Error("Failed to create resource");
        }
    },

    // Update resource with validation
    async updateResource(id: string, updateData: PartialResource): Promise<ResourceDocument> {
        try {
            // Validate ID
            if (!id || typeof id !== "string" || id.trim() === "") {
                throw new ValidationError("Valid resource ID is required");
            }

            // Validate the update data using partial schema
            const validatedUpdateData: PartialResource = PartialResourceSchema.parse(updateData);

            // Check if resource exists
            const existingResource = await this.getResourceById(id);

            const docRef = doc(db, COLLECTION_NAME, id);
            const updatePayload = {
                ...validatedUpdateData,
                updatedAt: new Date(),
            };

            await updateDoc(docRef, updatePayload);

            // Return the updated resource
            return {
                ...existingResource,
                ...validatedUpdateData,
                updatedAt: updatePayload.updatedAt,
            };
        } catch (error) {
            console.error("Error updating resource:", error);

            // Handle Zod validation errors
            if (error instanceof ZodError) {
                throw new ValidationError(
                    "Invalid update data provided",
                    error.flatten().fieldErrors,
                );
            }

            // Re-throw custom errors
            if (error instanceof ResourceNotFoundError || error instanceof ValidationError) {
                throw error;
            }

            throw new Error("Failed to update resource");
        }
    },

    // Delete resource
    async deleteResource(id: string): Promise<{ id: string }> {
        try {
            // Validate ID
            if (!id || typeof id !== "string" || id.trim() === "") {
                throw new ValidationError("Valid resource ID is required");
            }

            // Check if resource exists first (will throw ResourceNotFoundError if not)
            await this.getResourceById(id);

            await deleteDoc(doc(db, COLLECTION_NAME, id));
            return { id };
        } catch (error) {
            console.error("Error deleting resource:", error);

            // Re-throw custom errors
            if (error instanceof ResourceNotFoundError || error instanceof ValidationError) {
                throw error;
            }

            throw new Error("Failed to delete resource");
        }
    },

    // OVERLOADED METHODS: Accept both typed and unknown data

    // Type-safe version for internal use
    async createResourceTyped(resourceData: Resource): Promise<ResourceDocument> {
        return this.createResource(resourceData);
    },

    // Runtime validation version for API endpoints
    async createResourceFromUnknown(resourceData: unknown): Promise<ResourceDocument> {
        try {
            const validatedData: Resource = ResourceSchema.parse(resourceData);
            return this.createResource(validatedData);
        } catch (error) {
            if (error instanceof ZodError) {
                throw new ValidationError(
                    "Invalid resource data provided",
                    error.flatten().fieldErrors,
                );
            }
            throw error;
        }
    },

    // Type-safe version for internal use
    async updateResourceTyped(id: string, updateData: PartialResource): Promise<ResourceDocument> {
        return this.updateResource(id, updateData);
    },

    // Runtime validation version for API endpoints
    async updateResourceFromUnknown(id: string, updateData: unknown): Promise<ResourceDocument> {
        try {
            const validatedData: PartialResource = PartialResourceSchema.parse(updateData);
            return this.updateResource(id, validatedData);
        } catch (error) {
            if (error instanceof ZodError) {
                throw new ValidationError(
                    "Invalid update data provided",
                    error.flatten().fieldErrors,
                );
            }
            throw error;
        }
    },

    // Helper method: Validate resource data without saving (useful for forms)
    validateResourceData(data: unknown): {
        isValid: boolean;
        errors?: Record<string, string[]>;
        data?: Resource;
    } {
        const result = ResourceSchema.safeParse(data);

        if (result.success) {
            return { isValid: true, data: result.data };
        }

        return {
            isValid: false,
            errors: result.error.flatten().fieldErrors,
        };
    },

    // Helper method: Validate partial resource data (for updates)
    validatePartialResourceData(data: unknown): {
        isValid: boolean;
        errors?: Record<string, string[]>;
        data?: PartialResource;
    } {
        const result = PartialResourceSchema.safeParse(data);

        if (result.success) {
            return { isValid: true, data: result.data };
        }

        return {
            isValid: false,
            errors: result.error.flatten().fieldErrors,
        };
    },
};
