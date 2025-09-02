import Goal from "./types/Goal";

export const goalsData: Goal[] = [
    {
        goalType: {
            en: "Our academic goals",
            fr: "Nos objectifs académiques",
        },
        title: {
            en: "WE PROVIDE",
            fr: "NOUS FOURNISSONS",
        },
        highlightTitle: {
            en: "ACADEMIC HELP",
            fr: "AIDE ACADÉMIQUE",
        },
        description: {
            en: `SESA hosts exam review and mentorship sessions for engineering and science classes each academic term. 
        Throughout the school year, we conduct workshops to improve technical and soft skills. Meanwhile, we manage a free online 
        platform where we prepare resources for students by students about students.`,
            fr: `SESA organise des sessions de révision et de mentorat pour les cours d'ingénierie et de sciences chaque trimestre académique.
        Tout au long de l'année scolaire, nous organisons des ateliers pour améliorer les compétences techniques et relationnelles. Par ailleurs, nous gérons une plateforme en ligne gratuite où nous préparons des ressources par et pour les étudiants.`,
        },
        buttonLink: "/resources",
        buttonText: {
            en: "BROWSE RESOURCES",
            fr: "PARCOURIR LES RESSOURCES",
        },
        memberImgLinks: [
            "/imgs/team/jack.webp",
            "/imgs/team/shirina.webp",
            "/imgs/team/thomas-li.webp",
            "/imgs/team/ange.webp",
            "/imgs/team/aryan.webp",
        ],
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
            en: `While SESA's mission is to prepare the next generation of software engineers at uOttawa, we also host fun social events each semester. 
        We organize events, including movie nights, dog therapy, game nights, and parties. These events are designed to reduce student stress and develop their social skills!`,
            fr: `Bien que la mission de SESA soit de préparer la prochaine génération d'ingénieurs logiciels à l'uOttawa, nous organisons également des événements sociaux amusants chaque semestre. 
        Nous organisons des soirées cinéma, des séances de thérapie avec des chiens, des soirées jeux et des fêtes. Ces événements sont conçus pour réduire le stress des étudiants et développer leurs compétences sociales!`,
        },
        buttonLink: "/events",
        buttonText: {
            en: "Learn More",
            fr: "En savoir plus",
        },
        memberImgLinks: [
            "/imgs/team/mehdi.webp",
            "/imgs/team/taha.jpg",
            "/imgs/team/nodshley.webp",
        ],
        mainImg: "/imgs/Home/goals/social.webp",
    },
];
