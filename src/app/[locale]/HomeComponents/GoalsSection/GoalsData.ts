import Goal from "./types/Goal";

export const goalsData: Goal[] = [
    {
        goalType: "Our academic goals",
        title: "WE PROVIDE",
        highlightTitle: "ACADEMIC HELP",
        description: `SESA hosts exam review and mentorship sessions for engineering and science classes each academic term. 
        Throughout the school year, we conduct workshops to improve technical and soft skills. Meanwhile, we manage a free online 
        platform where we prepare resources for students by students about students.`,
        buttonLink: "/ResourcesPage",
        buttonText: "BROWSE RESOURCES",
        memberImgLinks: [
            "/imgs/team/jack.webp",
            "/imgs/team/shirina.webp",
            "/imgs/team/shuaib.webp",
            "/imgs/team/ange.webp",
        ],
        mainImg: "/imgs/Home/goals/academic.webp",
    },
    {
        goalType: "Our event goals",
        title: "We organize",
        highlightTitle: "social events",
        description: `While SESA's mission is to prepare the next generation of software engineers at uOttawa, we also host fun social events each semester. 
        We organize events, including movie nights, dog therapy, game nights, and parties. These events are designed to reduce student stress and develop their social skills!`,
        buttonLink: "/EventsPage",
        buttonText: "Learn More",
        memberImgLinks: [
            "/imgs/team/jack.webp",
            "/imgs/team/shirina.webp",
            "/imgs/team/shuaib.webp",
            "/imgs/team/ange.webp",
        ],
        mainImg: "/imgs/Home/goals/social.webp",
    },
];
