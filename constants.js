import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT || 3000;
export const HOST = process.env.HOST || "localhost";

// Single source of truth for all pages
export const PAGES = {
    HOME: {
        name: "home",
        path: "/",
        title: "Home",
        viewFile: "home",
        navLabel: "Home",
    },
    ABOUT: {
        name: "about",
        path: "/about",
        title: "About",
        viewFile: "about",
        navLabel: "About Us",
    },
    CALL_FOR_PAPERS: {
        name: "call_for_papers",
        path: "/cfp",
        title: "Call for Papers",
        viewFile: "cfp",
        navLabel: "Call For Papers",
    },
    REGISTRATION: {
        name: "registration",
        path: "/registration",
        title: "Registration",
        viewFile: "registration",
        navLabel: "Registration",
    },
    SPEAKERS: {
        name: "speakers",
        path: "/speakers",
        title: "Speakers",
        viewFile: "speakers",
        navLabel: "Invited Speakers",
    },
    COMMITTEES: {
        name: "committees",
        path: "/committees",
        title: "Committees",
        viewFile: "committees",
        navLabel: "Committee",
    },
    SPONSORSHIP: {
        name: "sponsorship",
        path: "/sponsorship",
        title: "Sponsorship",
        viewFile: "sponsorship",
        navLabel: "Sponsorship",
    },
    CONTACT: {
        name: "contact",
        path: "/contact",
        title: "Contact",
        viewFile: "contact",
        navLabel: "Contact Us",
    },
    ACCOMMODATION: {
        name: "accomodation",
        path: "/accomodation",
        title: "Accomodation",
        viewFile: "accomodation",
        navLabel: "Accommodation",
    },
    NOT_FOUND: {
        name: "not_found",
        title: "404 - Not Found",
        viewFile: "404",
    },
};

export const PAGES_ARRAY = Object.values(PAGES).filter(
    (page) => page.name !== "not_found"
);
