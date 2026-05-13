import express from "express";
import { PORT, HOST, PAGES } from "./constants.js";
import webRouter from "./routes/web.js";

const application = express();

application.set("view engine", "ejs");
application.set("views", "./views");
application.set("view cache", false);

application.use(express.static("public"));

application.use("/", webRouter);

application.get("/status", (request, response) => {
  response.status(200).json({ status: "OK" });
});
// Catch-all route for 404 errors (should be placed after all other routes)
application.use((request, response) => {
  response
    .status(404)
    .render("index", { title: PAGES.NOT_FOUND.title, page: PAGES.NOT_FOUND.viewFile });
});
application.listen(PORT, HOST, () => {
  console.log(`Server is running at http://${HOST}:${PORT}`);
});
