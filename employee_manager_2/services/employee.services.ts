import { CreateAddressDto } from "../dto/create-address.dto";
import Address from "../entities/address.entity";
import Employee, { EmployeeRole } from "../entities/employee.entity";
import EmployeeRepository from "../repositories/employee.repository";
import bcrypt from "bcrypt";
import { LoggerService } from "./logger.service";

class EmployeeServices {
    private logger = LoggerService.getInstance(EmployeeServices.name);
    constructor(private employeeRepository: EmployeeRepository) {}

    async createEmployee(
        email: string,
        name: string,
        age: number,
        password: string,
        address: CreateAddressDto,
        role: EmployeeRole
    ): Promise<Employee> {
        this.logger.info("Service: Create Employee");
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
        this.logger.info(`New Employee Created`);
        return this.employeeRepository.create(newEmployee);
    }

    async getAllEmployees(): Promise<Employee[]> {
        this.logger.info("Service: Get All Employees");
        return this.employeeRepository.findMany();
    }

    async getEmployeeById(id: number): Promise<Employee | null> {
        this.logger.info("Service: Get Employee By Id");
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
        this.logger.info("Service: Get Employee By Email");
        return this.employeeRepository.findOneByEmail(email);
    }

    async updateEmployee(
        id: number,
        email: string,
        name: string,
        age: number,
        role: EmployeeRole,
        address: CreateAddressDto
    ): Promise<void> {
        this.logger.info("Service: Update Employee ");

        const existingEmployee = await this.employeeRepository.findOneById(id);

        if (existingEmployee) {
            // const newAddress = new Address();
            // newAddress.line1 = address.line1 || existingEmployee.address.line1;
            // newAddress.pincode =
            //     Number(address.pincode) || existingEmployee.address.pincode;

            // const employee = new Employee();
            // employee.name = name || existingEmployee.name;
            // employee.email = email || existingEmployee.email;
            // employee.age = age || existingEmployee.age;
            // employee.role = role || existingEmployee.role;
            // employee.address = newAddress;

            const exisitingAddress = existingEmployee.address || new Address();
            exisitingAddress.line1 =
                address.line1 || existingEmployee.address.line1;
            exisitingAddress.pincode =
                Number(address.pincode) || existingEmployee.address.pincode;

            existingEmployee.name = name || existingEmployee.name;
            existingEmployee.email = email || existingEmployee.email;
            existingEmployee.age = age || existingEmployee.age;
            existingEmployee.role = role || existingEmployee.role;
            existingEmployee.address = exisitingAddress;

            await this.employeeRepository.update(id, existingEmployee);
        }
    }

    async deleteEmployee(id: number): Promise<void> {
        this.logger.info("Service: Delete Employee");
        const existingEmployee = await this.employeeRepository.findOneById(id);
        if (existingEmployee) await this.employeeRepository.delete(id);
    }
}

export default EmployeeServices;
