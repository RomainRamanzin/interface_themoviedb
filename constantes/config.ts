import dotenv from 'dotenv';

dotenv.config();
export const API_KEY = process.env.THEMOVIEDB_API_KEY || "defaultKey";
export const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 3000;
export const NODE_ENV = process.env.NODE_ENV || "production";