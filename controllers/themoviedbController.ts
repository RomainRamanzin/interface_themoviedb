import axios, { AxiosResponse } from 'axios';
import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../errors/ApiError';
import { MinimalMovieData } from '../interfaces/MinimalMovieData';

/***
 * @swagger
 * tags:
 *  name: TheMovieDB
 *  description: Récupération de données liées à des films ou des séries
 */

export class ThemoviedbController {
    private API_KEY: string;

    constructor(apiKey: string) {
        this.API_KEY = apiKey;
    }

  /**
   * @swagger
   * /movies/popular:
   *   get:
   *     summary: Récupérer les films populaires
   *     tags: [TheMovieDB]
   *     parameters:
   *       - in: query
   *         name: language
   *         required: false
   *         description: Langue des données à récupérer
   *         schema:
   *           type: string
   *       - in: query
   *         name: page
   *         required: false
   *         description: Numéro de la page à récupérer
   *         schema:
   *           type: number
   *     responses:
   *       200:
   *         description: Récupération des films populaires
   *       400:
   *         description: Erreur lors de la récupération des films populaires
   */
  public async getPopularMovies(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const language = req.query.language || "fr-FR";
    const page = req.query.page || 1;
    try {
      const response: AxiosResponse = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${this.API_KEY}&language=${language}&page=${page}`
      );

      const minimalData: MinimalMovieData[] = response.data.results.map(
        (movie: any) => {
          return {
            id: movie.id,
            title: movie.title,
            poster_path: movie.poster_path,
            release_date: movie.release_date,
            overview: movie.overview,
            vote_average: movie.vote_average,
            vote_count: movie.vote_count,
          };
        }
      );

      res.json(minimalData);
    } catch (error) {
      next(new ApiError("Erreur lors de la récupération des films populaires"));
    }
  }

  /**
   * @swagger
   * /movies/search:
   *   get:
   *     summary: Rechercher un film
   *     tags: [TheMovieDB]
   *     parameters:
   *       - in: query
   *         name: query
   *         required: true
   *         description: Requête de recherche
   *         schema:
   *           type: string
   *       - in: query
   *         name: language
   *         required: false
   *         description: Langue des données à récupérer
   *         schema:
   *           type: string
   *       - in: query
   *         name: page
   *         required: false
   *         description: Numéro de la page à récupérer
   *         schema:
   *           type: number
   *     responses:
   *       200:
   *         description: Récupération d'une liste de films correspondant à la requête de recherche
   *       400:
   *         description: Erreur lors de la recherche de films
   */
  public async searchMovies(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const query = req.query.query;
    const language = req.query.language || "fr-FR";
    const page = req.query.page || 1;
    try {
      const response: AxiosResponse = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${this.API_KEY}&language=${language}&query=${query}&page=${page}`
      );

      const minimalData: MinimalMovieData[] = response.data.results.map(
        (movie: any) => {
          return {
            id: movie.id,
            title: movie.title,
            poster_path: movie.poster_path,
            release_date: movie.release_date,
            overview: movie.overview,
            vote_average: movie.vote_average,
            vote_count: movie.vote_count,
          };
        }
      );

      res.json(minimalData);
    } catch (error) {
      next(new ApiError("Erreur lors de la recherche de films"));
    }
  }

}