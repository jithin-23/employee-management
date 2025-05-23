import AuthService from "../services/auth.services";
import { Router } from "express";
import { Request, Response, NextFunction } from "express";
import HttpException from "../exception/httpException";

class AuthController {
    constructor(private authService: AuthService, private router: Router) {
        router.post("/login", this.login.bind(this));
    }

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                throw new HttpException(400, "Enter email and password");
            }
            const data = await this.authService.login(email, password);

            res.status(200).send(data);
        } catch (err) {
            console.log(err);
            next(err);
        }
    }
}

export default AuthController;
