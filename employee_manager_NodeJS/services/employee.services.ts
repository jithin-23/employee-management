import { CreateAddressDto } from "../dto/create-address.dto";
import Address from "../entities/address.entity";
import Employee, { EmployeeRole } from "../entities/employee.entity";
import EmployeeRepository from "../repositories/employee.repository";
import bcrypt from "bcrypt";
import { LoggerService } from "./logger.service";
import { CreateEmployeeDto } from "../dto/create-employee.dto";
import DepartmentServices from "./department.services";
import { UpdateEmployeeDto } from "../dto/update-employee.dto";
import HttpException from "../exception/httpException";

class EmployeeServices {
    private logger = LoggerService.getInstance(EmployeeServices.name);
    constructor(
        private employeeRepository: EmployeeRepository,
        private departmentServices: DepartmentServices
    ) {}

    async createEmployee(
        createEmployeeDto: CreateEmployeeDto
    ): Promise<Employee> {
        this.logger.info("Service: Create Employee");
        const newAddress = new Address();
        newAddress.line1 = createEmployeeDto.address.line1;
        newAddress.line2 = createEmployeeDto.address.line2;
        newAddress.houseNo = createEmployeeDto.address.houseNo;
        newAddress.pincode = Number(createEmployeeDto.address.pincode);

        const newEmployee = new Employee();
        newEmployee.name = createEmployeeDto.name;
        newEmployee.email = createEmployeeDto.email;
        newEmployee.age = Number(createEmployeeDto.age);
        newEmployee.password = await bcrypt.hash(
            createEmployeeDto.password,
            10
        );
        newEmployee.address = newAddress;
        newEmployee.role = createEmployeeDto.role;

        newEmployee.department =
            await this.departmentServices.getDepartmentById(
                createEmployeeDto.department_id
            );


        newEmployee.experience = createEmployeeDto.experience;
        newEmployee.status = createEmployeeDto.status;
        newEmployee.dateOfJoining = new Date(createEmployeeDto.dateOfJoining);
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
            throw new HttpException(404, "Employee not found");
        }
        return employee;
    }

    async getEmployeeByEmail(email: string): Promise<Employee> | null {
        this.logger.info("Service: Get Employee By Email");
        return this.employeeRepository.findOneByEmail(email);
    }

    async updateEmployee(
        id: number,
        updateEmployeeDto: UpdateEmployeeDto
    ): Promise<void> {
        this.logger.info("Service: Update Employee ");

        const existingEmployee = await this.employeeRepository.findOneById(id);

        if (!existingEmployee)
            throw new HttpException(404, "Employee not found");

        const exisitingAddress = existingEmployee.address || new Address();
        if (updateEmployeeDto.address?.line1) exisitingAddress.line1 = updateEmployeeDto.address.line1;
        if (updateEmployeeDto.address?.line2) exisitingAddress.line2 = updateEmployeeDto.address.line2;
        if (updateEmployeeDto.address?.houseNo) exisitingAddress.houseNo = updateEmployeeDto.address.houseNo;
        if (updateEmployeeDto.address?.pincode) exisitingAddress.pincode = Number(updateEmployeeDto.address.pincode);


        if (updateEmployeeDto.name) existingEmployee.name = updateEmployeeDto.name;
        if (updateEmployeeDto.email) existingEmployee.email = updateEmployeeDto.email;
        if (updateEmployeeDto.age) existingEmployee.age = updateEmployeeDto.age;
        if (updateEmployeeDto.role) existingEmployee.role = updateEmployeeDto.role;
        if (updateEmployeeDto.experience) existingEmployee.experience = updateEmployeeDto.experience;
        if (updateEmployeeDto.status) existingEmployee.status = updateEmployeeDto.status;        
        if (updateEmployeeDto.dateOfJoining) existingEmployee.dateOfJoining = updateEmployeeDto.dateOfJoining;
        existingEmployee.address = exisitingAddress;

        if (updateEmployeeDto.department_id) {
            const department_id = updateEmployeeDto.department_id;
            const newDepartment =
                await this.departmentServices.getDepartmentById(department_id);
            existingEmployee.department = newDepartment;
        }
        await this.employeeRepository.update(id, existingEmployee);
    }

    async deleteEmployee(id: number): Promise<void> {
        this.logger.info("Service: Delete Employee");
        const existingEmployee = await this.employeeRepository.findOneById(id);
        if (!existingEmployee)
            throw new HttpException(404, "Employee not found");
        await this.employeeRepository.delete(id);
    }
}

export default EmployeeServices;
