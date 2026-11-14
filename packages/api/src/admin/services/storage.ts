/**
 * File uploads for member photos, event images and resource files. The admin context uses
 * `fakeFileStorage`.
 */

export type UploadKind = "member-photo" | "event-image" | "resource-file";

export type UploadRequest = { kind: UploadKind; contentType: string; size: number };

export type Upload = {
    /** Where the client sends the file. */
    uploadUrl: string;
    /** Where the file is served once uploaded; this is what gets saved on the record. */
    publicUrl: string;
};

export interface FileStorage {
    /** Rejects types and sizes not allowed for `kind`. */
    createUpload(input: UploadRequest): Promise<Upload>;
}

/**
 * Logs every call and returns URLs on the reserved `.invalid` domain, so nothing can be uploaded.
 */
export const fakeFileStorage: FileStorage = {
    async createUpload(input) {
        console.info("[fake storage] createUpload", JSON.stringify(input));
        const path = `${input.kind}/${crypto.randomUUID()}`;
        return {
            uploadUrl: `https://storage.invalid/upload/${path}`,
            publicUrl: `https://storage.invalid/public/${path}`,
        };
    },
};
