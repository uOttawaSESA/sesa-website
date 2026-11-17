import type Goal from "./types/Goal";

export const goalsData: Goal[] = [
    {
        goalType: {
            en: "Our academic goals",
            fr: "Nos objectifs académiques",
        },
        title: {
            en: "WE PROVIDE",
            fr: "NOUS OFFRONS DU",
        },
        highlightTitle: {
            en: "ACADEMIC HELP",
            fr: "SOUTIEN ACADÉMIQUE",
        },
        description: {
            en: `SESA hosts exam review and mentorship sessions for engineering and science classes each academic term. 
        Throughout the school year, we conduct workshops to improve technical and soft skills. Meanwhile, we manage a free online 
        platform where we prepare resources for students by students about students.`,
            fr: `L’AÉGL organise des séances de révision et de mentorat pour les cours de génie et de sciences chaque session.
        Tout au long de l’année scolaire, nous offrons des ateliers pour développer les compétences techniques et relationnelles. Par ailleurs, nous gérons une plateforme en ligne gratuite où nous préparons des ressources par et pour la communauté étudiante.`,
        },
        buttonLink: "/resources",
        buttonText: {
            en: "BROWSE RESOURCES",
            fr: "PARCOURIR LES RESSOURCES",
        },
        teamKey: "academics",
        mainImg: "/imgs/Home/goals/academic.webp",
    },
    {
        goalType: {
            en: "Our event goals",
            fr: "Nos objectifs événementiels",
        },
        title: {
            en: "We organize",
            fr: "Nous organisons",
        },
        highlightTitle: {
            en: "social events",
            fr: "des événements sociaux",
        },
        description: {
            en: `While SESA’s mission is to prepare the next generation of software engineers at uOttawa, we also host fun social events each semester. 
        We organize events, including movie nights, dog therapy, game nights, and parties. These events are designed to reduce student stress and develop their social skills!`,
            fr: `Bien que la mission de l’AÉGL soit de préparer la relève en génie logiciel à uOttawa, nous organisons également des activités sociales amusantes chaque session. 
        Au programme : soirées cinéma, zoothérapie avec des chiens, soirées jeux et fêtes. Ces événements visent à réduire le stress de la communauté étudiante et à développer ses compétences sociales!`,
        },
        buttonLink: "/events",
        buttonText: {
            en: "Learn More",
            fr: "En savoir plus",
        },
        teamKey: "logistics",
        mainImg: "/imgs/Home/goals/social.webp",
    },
];
