export interface Event {
    title: string;
    type: string;
    date: string;
    location: string;
    description: string;
    image: string;
    requiresRegistration: boolean;
    instagramLink: string;
    registrationLink?: string;
}
