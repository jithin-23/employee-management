import express from "express";
import EmployeeRepository from "../repositories/employee.repository";
import dataSource from "../db/data-source";
import Employee, { EmployeeRole } from "../entities/employee.entity";
import EmployeeServices from "../services/employee.services";
import EmployeeController from "../controllers/employee.controller";
import { authorizationMiddleware } from "../middlewares/authorization.middleware";
import { departmentServices } from "./department.routes";

const employeeRouter = express.Router();

const employeeRepository = new EmployeeRepository(dataSource.getRepository(Employee));
const employeeService = new EmployeeServices(employeeRepository,departmentServices);
const employeeController = new EmployeeController(employeeService);


employeeRouter.post("/",authorizationMiddleware([EmployeeRole.HR, EmployeeRole.DEVELOPER]), employeeController.createEmployee .bind(employeeController));
employeeRouter.get("/", employeeController.getAllEmployees .bind(employeeController));
employeeRouter.get("/:id",employeeController.getEmployeeById .bind(employeeController));
employeeRouter.put("/:id",employeeController.updateEmployee .bind(employeeController));
employeeRouter.patch("/:id",employeeController.updateEmployee .bind(employeeController));
employeeRouter.delete("/:id",employeeController.deleteEmployee .bind(employeeController));

export default employeeRouter;
export { employeeService };

