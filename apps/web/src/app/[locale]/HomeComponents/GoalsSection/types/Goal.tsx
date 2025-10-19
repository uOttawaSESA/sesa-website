export default interface Goal {
    goalType: { en: string; fr: string };
    title: { en: string; fr: string };
    highlightTitle: { en: string; fr: string };
    description: { en: string; fr: string };
    buttonLink: string;
    buttonText: { en: string; fr: string };
    memberImgLinks: string[];
    mainImg: string;
}
