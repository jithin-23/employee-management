import { NextFunction, Request, Response } from "express";
import { EmployeeRole } from "../entities/employee.entity";
import HttpException from "../exception/httpException";

export const authorizationMiddleware = (allowedRoles: EmployeeRole[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const role = req.user?.role;
        if (!allowedRoles.includes(role)) {
            throw new HttpException(
                403,
                "User has no privilege to access the resource"
            );
        }
        next();
    };
};
