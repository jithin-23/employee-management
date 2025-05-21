import { NextFunction, Request, Response } from "express";

export const loggerMiddleware = ( req:Request, res:Response,  next: NextFunction) => {

    res.on("finish", () => {
        const statusCode = res.statusCode;
        console.log(`${new Date().toISOString()} ${req.method} ${req.originalUrl} ${statusCode}`)
    })
    
    next();
}