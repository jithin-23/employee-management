import { Request, Response, NextFunction } from "express";

export const processTimeMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const startTime = Number(new Date());

  res.on("finish", () => {
    const endTime = Number(new Date());
    console.log(`Time taken: ${endTime - startTime}ms`);
  });
  next();
};
