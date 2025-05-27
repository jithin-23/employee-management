import AuthController from "../controllers/auth.controller";
import AuthService from "../services/auth.services"
import express from "express"
import { employeeService } from "./employee.route";

const authRouter = express.Router()

// const repository = dataSource.getRepository(Employee);
// const employeeRepository = new EmployeeRepository(repository);
// const employeeService = new EmployeeServices(employeeRepository);
const authService = new AuthService(employeeService);
const authController = new AuthController(authService, authRouter);

export default authRouter;