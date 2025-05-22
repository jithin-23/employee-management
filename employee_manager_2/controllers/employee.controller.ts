import HttpException from "../exception/httpException";
import EmployeeServices from "../services/employee.services";
import { NextFunction, Request, Response } from "express";
import { isEmail } from "../validators/emailValidator";
import { CreateAddressDto } from "../dto/create-address.dto";
import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";
import { CreateEmployeeDto } from "../dto/create-employee.dto";

class EmployeeController {
  constructor(private employeeService: EmployeeServices) {}

  async createEmployee(req: Request, res: Response, next: NextFunction) {
    try {
      const createEmployeeDto = plainToInstance(CreateEmployeeDto, req.body);
      const errors = await validate(createEmployeeDto);
      if (errors.length > 0) {
        console.log(JSON.stringify(errors));
        throw new HttpException(400, JSON.stringify(errors));
      }
      const savedEmployee = await this.employeeService.createEmployee(
        createEmployeeDto.email,
        createEmployeeDto.name,
        createEmployeeDto.age,
        createEmployeeDto.address
      );
      res.status(201).send(savedEmployee);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async getAllEmployees(req: Request, res: Response) {
    const employees = await this.employeeService.getAllEmployees();
    res.status(200).send(employees);
  }

  async getEmployeeById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const employee = await this.employeeService.getEmployeeById(id);
      if (!employee) {
        throw new HttpException(404, "Not Found");
      }
      res.status(200).send(employee);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  async updateEmployee(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const employee = await this.employeeService.getEmployeeById(id);
      if (!employee) {
        throw new HttpException(404, "Employee Not Found");
      }
      const createEmployeeDto = plainToInstance(CreateEmployeeDto, req.body);
      await this.employeeService.updateEmployee(
        id,
        createEmployeeDto.email,
        createEmployeeDto.name,
        createEmployeeDto.age
      );
      res.status(200).send();
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  async deleteEmployee(req: Request, res: Response) {
    const id = Number(req.params.id);
    await this.employeeService.deleteEmployee(id);
    res.status(204).send();
  }
}

export default EmployeeController;
