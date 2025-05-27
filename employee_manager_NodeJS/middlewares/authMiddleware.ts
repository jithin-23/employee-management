import { Request, Response, NextFunction } from "express";
import HttpException from "../exception/httpException";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../utils/constants";
import { JwtPayload } from "../dto/jwt-payload";
import { EmployeeRole } from "../entities/employee.entity";

const getToken = (req: Request) => {
    const token: string = req.headers.authorization;
    if (!token) throw new HttpException(404, "Not authorized");
    const tokenSplits = token.split(" ");

    if (tokenSplits.length != 2) throw new HttpException(401, "Invalid Token");
    return tokenSplits[1];
};

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = getToken(req);
    if (!token) throw new HttpException(401, "Not authorized");
    try {
        const payload = jwt.verify(token, JWT_SECRET) as JwtPayload;
        req.user = payload;
    } catch (err) {
        throw new HttpException(401, "Invalid or expired token");
    }

    next();
};

export default authMiddleware;
