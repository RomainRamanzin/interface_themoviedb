import { NextFunction, Request, Response } from "express";
import logger from "./logger";


export function logRequest(req: Request, res: Response, next: NextFunction){
    logger.info(`[${new Date().toISOString()}] ${req.method} to ${req.originalUrl} from ${req.ip}`);
    next();
}