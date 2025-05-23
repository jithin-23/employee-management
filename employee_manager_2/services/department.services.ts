import { CreateDepartmentDto } from "../dto/create-department.dto";
import { UpdateDepartmentDto } from "../dto/update-department.dto";
import { UpdateEmployeeDto } from "../dto/update-employee.dto";
import Department from "../entities/department.entity";
import DepartmentRepository from "../repositories/department.repository";
import { LoggerService } from "./logger.service";

class DepartmentServices {
    private logger = LoggerService.getInstance(DepartmentServices.name);
    constructor(private departmentRepository: DepartmentRepository) {}

    async createDepartment(
        createDepartmentDto: CreateDepartmentDto
    ): Promise<Department> {
        this.logger.info("Service: Create Department");
        const newDepartment = new Department();
        newDepartment.name = createDepartmentDto.name;
        newDepartment.location = createDepartmentDto.location;
        this.logger.info("Service: Create Department - Employee Created");
        return this.departmentRepository.create(newDepartment);
    }

    async getAllDepartments(): Promise<Department[]> {
        this.logger.info("Service: Get All Departments");
        return this.departmentRepository.findMany();
    }

    async getDepartmentById(id: number): Promise<Department> {
        this.logger.info("Service: Get Department By Id");
        return this.departmentRepository.findOneById(id);
    }

    async getDepartmentByName(name: string): Promise<Department> {
        this.logger.info("Service: Get Department By Name");
        return this.departmentRepository.findOneByName(name);
    }

    async updateDepartment(
        id: number,
        updateDepartmentDto: UpdateDepartmentDto
    ): Promise<void> {
        this.logger.info("Service: Update Department");

        const existingDepartment = await this.departmentRepository.findOneById(
            id
        );
        if (existingDepartment) {
            existingDepartment.name =
                updateDepartmentDto.name || existingDepartment.name;
            existingDepartment.location =
                updateDepartmentDto.location || existingDepartment.location;
            this.logger.info("Service: Update Department - Department Updated");

            await this.departmentRepository.update(id, existingDepartment);
        }
    }

    async deleteDepartment(id: number): Promise<void> {
        this.logger.info("Service: Delete Department");
        const existingDepartment = await this.departmentRepository.findOneById(
            id
        );

        if (existingDepartment) await this.departmentRepository.delete(id);
    }
}

export default DepartmentServices;
