import { PAGES_ARRAY } from "../constants.js";

const webController = {};

for (const pageConfig of PAGES_ARRAY) {
  webController[pageConfig.name] = (req, res) => {
    res.render("index", {
      title: pageConfig.title,
      page: pageConfig.viewFile,
      static: false,
      navLinks: PAGES_ARRAY.map((p) => ({
        label: p.navLabel,
        url: p.path,
      })),
    });
  };
}

export default webController;
