import { Router } from "express";
import { moviesController } from "../controllers/moviesController.js";
import { seriesController } from "../controllers/seriesController.js";
import { homeController } from "../controllers/homeController.js";

const router = Router();

//Page home du site
router.get("/", homeController.home);

//Page home des films
router.get("/movies/:page", moviesController.index);
router.post("/movies/", moviesController.formSearch);
router.get("/movies/:id/detail", moviesController.movieDetail);

//Page home des series

router.get("/series/:page", seriesController.index);
router.post("/series/", seriesController.formSearch);
router.get("/series/:id/detail", seriesController.movieDetail);

export { router };