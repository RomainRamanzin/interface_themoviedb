import { NextFunction, Request, Response } from "express";
import logger from "./logger";


export function logResponse(req: Request, res: Response, next: NextFunction){
    const start = Date.now();

    res.on('finish', () => {
        const duration = Date.now() - start;
        logger.info(`[${new Date().toISOString()}] ${req.method} to ${req.originalUrl} responded with status ${res.statusCode} in ${duration}ms`);
    });
    
    next();
}