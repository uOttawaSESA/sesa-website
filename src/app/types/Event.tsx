export interface Event {
    title: { en: string; fr: string };
    type: { en: string; fr: string };
    date: Date;
    startTime: Date;
    endTime: Date;
    location: string;
    description: { en: string; fr: string };
    image: string;
    requiresRegistration: boolean;
    instagramLink: string;
    registrationLink?: string;
}
