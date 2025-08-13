export interface Event {
    title: string;
    type: string;
    date: Date;
    startTime: Date;
    endTime: Date;
    location: string;
    description: string;
    image: string;
    requiresRegistration: boolean;
    instagramLink: string;
    registrationLink?: string;
}
