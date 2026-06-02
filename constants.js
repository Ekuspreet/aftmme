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
    PUBLICATION_OPPORTUNITIES: {
        name: "publication_opportunities",
        path: "/publication-opportunities",
        title: "Publication Opportunities",
        viewFile: "publication_opportunities",
        navLabel: "Publication Opportunities",
    },
    AUTHOR_GUIDELINES: {
        name: "author_guidelines",
        path: "/author-guidelines",
        title: "Author Guidelines",
        viewFile: "author_guidelines",
        navLabel: "Author Guidelines",
    },
    PEER_REVIEW_ETHICS: {
        name: "peer_review_and_publication_ethics",
        path: "/peer-review-publication-ethics",
        title: "Peer Review and Publication Ethics",
        viewFile: "peer_review_and_publication_ethics",
        navLabel: "Peer Review & Ethics",
    },
    IMPORTANT_DATES: {
        name: "important_dates",
        path: "/important-dates",
        title: "Important Dates",
        viewFile: "important_dates",
        navLabel: "Important Dates",
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
        title: "Accommodation",
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
