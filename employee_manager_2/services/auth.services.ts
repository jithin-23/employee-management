import { JwtPayload } from "../dto/jwt-payload";
import HttpException from "../exception/httpException";
import { JWT_SECRET, JWT_VALIDITY } from "../utils/constants";
import EmployeeServices from "./employee.services";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class AuthService {
    constructor(private employeeService: EmployeeServices) {}

    async login(email: string, password: string) {
        const employee = await this.employeeService.getEmployeeByEmail(email);
        if (!employee) {
            throw new HttpException(404, "No such user found");
        }

        const isPasswordValid = await bcrypt.compare(
            password,
            employee.password
        );

        if (!isPasswordValid) {
            throw new HttpException(400, "Incorrect password entry");
        }
        console.log(employee);

        const payload: JwtPayload = { id: employee.id, email: employee.email, role: employee.role };

        const token = jwt.sign(payload, JWT_SECRET, {
            expiresIn: JWT_VALIDITY,
        });
        return {
            tokenType: "Bearer",
			accesstoken: token
        };
    }
}

export default AuthService;
