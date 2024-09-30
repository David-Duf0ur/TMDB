import { Router } from "express";
import { homeController } from "../controllers/homeController.js";

const router = Router();

router.get("/", homeController.home);
router.get("/:page", homeController.index);
router.post("/movie/", homeController.formSearch);
router.get("/movie/:id", homeController.movieDetail);

export { router };