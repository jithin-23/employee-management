import { CreateAddressDto } from "../dto/create-address.dto";
import Address from "../entities/address.entity";
import Employee, { EmployeeRole } from "../entities/employee.entity";
import EmployeeRepository from "../repositories/employee.repository";
import bcrypt from "bcrypt";
import { LoggerService } from "./logger.service";

class EmployeeServices {
    private logger = LoggerService.getInstance(EmployeeServices.name)
    constructor(private employeeRepository: EmployeeRepository) {}

    async createEmployee(
        email: string,
        name: string,
        age: number,
        password: string,
        address: CreateAddressDto,
        role: EmployeeRole
    ): Promise<Employee> {
        const newAddress = new Address();
        newAddress.line1 = address.line1;
        newAddress.pincode = Number(address.pincode);

        const newEmployee = new Employee();
        newEmployee.name = name;
        newEmployee.email = email;
        newEmployee.age = Number(age);
        newEmployee.password = await bcrypt.hash(password, 10);
        newEmployee.address = newAddress;
        newEmployee.role = role;
        return this.employeeRepository.create(newEmployee);
    }

    async getAllEmployees(): Promise<Employee[]> {
        return this.employeeRepository.findMany();
    }

    async getEmployeeById(id: number): Promise<Employee | null> {
        let employee = await this.employeeRepository.findOneById(id);
        if (!employee) {
            throw new Error("Employee not found");
        }
        return employee;
    }

    // async getEmployeeById(id: number): Promise<Employee> | null {
    //   return this.employeeRepository.findOneById(id);
    // }

    async getEmployeeByEmail(email: string): Promise<Employee> | null {
        return this.employeeRepository.findOneByEmail(email);
    }

    async updateEmployee(
        id: number,
        email: string,
        name: string,
        age: number
    ): Promise<void> {
        const existingEmployee = await this.employeeRepository.findOneById(id);

        if (existingEmployee) {
            const employee = new Employee();
            employee.name = name;
            employee.email = email;
            employee.age = age;
            await this.employeeRepository.update(id, employee);
        }
    }

    async deleteEmployee(id: number): Promise<void> {
        const existingEmployee = await this.employeeRepository.findOneById(id);
        if (existingEmployee) await this.employeeRepository.delete(id);
    }
}

export default EmployeeServices;
