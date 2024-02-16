import express, { NextFunction, Request, Response } from "express";
import { errorHandler } from "./middlewares/errorHandler";
import logger from "./middlewares/logger";
import { logResponse } from "./middlewares/logResponse";
import { logRequest } from "./middlewares/logRequest";
import dotenv from 'dotenv';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { swaggerOptions } from "./swaggerOptions";
import { API_KEY, PORT } from "./constantes/config";
import { ThemoviedbController } from "./controllers/themoviedbController";

dotenv.config();

const app = express();

const themoviedbController = new ThemoviedbController(API_KEY);

app.use(errorHandler);
app.use(logRequest);
app.use(logResponse);

// Route de test
app.get("/test", (req: Request, res: Response) => {
  res.send("Hello World");
});

// route pour récupérer les films populaires
app.get("/movies/popular", async (req: Request, res: Response, next: NextFunction) => {
    await themoviedbController.getPopularMovies(req, res, next);
});

// route pour rechercher un film
app.get("/movies/search", async (req: Request, res: Response, next: NextFunction) => {
    await themoviedbController.searchMovies(req, res, next);
});

// Documentation Swagger
const specs = swaggerJSDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// Lancement du serveur
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  logger.info(`Server is running on port ${PORT}`);
});