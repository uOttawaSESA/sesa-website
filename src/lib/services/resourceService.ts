import { Resource } from "@/app/types/Resource";
import { collection, getDocs, doc, getDoc, addDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";

const COLLECTION_NAME = "Resources";

export const resourceService = {
    // Get all resources
    async getAllResources() {
        try {
            const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
            return querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
        } catch (error) {
            console.error("Error fetching resources:", error);
            throw new Error("Failed to fetch resources");
        }
    },

    // Get single resource by ID
    async getResourceById(id: string) {
        try {
            const docRef = doc(db, COLLECTION_NAME, id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                return { id: docSnap.id, ...docSnap.data() };
            } else {
                throw new Error("Resource not found");
            }
        } catch (error) {
            console.error("Error fetching resource:", error);
            throw error;
        }
    },

    // Add new resource
    async createResource(resourceData: Resource) {
        try {
            const docRef = await addDoc(collection(db, COLLECTION_NAME), {
                ...resourceData,
                createdAt: new Date(),
                updatedAt: new Date(),
            });
            return { id: docRef.id, ...resourceData };
        } catch (error) {
            console.error("Error creating resource:", error);
            throw new Error("Failed to create resource");
        }
    },

    // Update resource
    async updateResource(id: string, updateData: Partial<Resource>) {
        try {
            const docRef = doc(db, COLLECTION_NAME, id);
            await updateDoc(docRef, {
                ...updateData,
                updatedAt: new Date(),
            });
            return { id, ...updateData };
        } catch (error) {
            console.error("Error updating resource:", error);
            throw new Error("Failed to update resource");
        }
    },

    // Delete resource
    async deleteResource(id: string) {
        try {
            await deleteDoc(doc(db, COLLECTION_NAME, id));
            return { id };
        } catch (error) {
            console.error("Error deleting resource:", error);
            throw new Error("Failed to delete resource");
        }
    },
};
