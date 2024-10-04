import "dotenv/config";
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import { router } from "./app/router/router.js";
import express from "express";

const app = express()

app.use(express.urlencoded({ extended: false }))
const __dirname = fileURLToPath(new URL('.', import.meta.url));

const securedStaticPath = join(__dirname, "public");
app.use(express.static(securedStaticPath));

app.set("view engine", "ejs")

const securedViewsPath = join(__dirname, "app/views");
app.set("views", securedViewsPath)

app.set("port", process.env.PORT || 3000);
app.set("base_url", process.env.BASE_URL || "localhost");

app.use(router);

app.listen(app.get("port"), () => {
	console.log(`Listening at ${app.get("base_url")}:${app.get("port")}`)
});