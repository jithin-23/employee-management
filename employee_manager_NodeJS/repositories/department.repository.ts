import { Repository } from "typeorm";
import Department from "../entities/department.entity";
import Employee from "../entities/employee.entity";

class DepartmentRepository {
    constructor(private repository: Repository<Department>) {}

    async create(department: Department): Promise<Department> {
        return this.repository.save(department);
    }

    async findMany(): Promise<Department[]> {
        return this.repository.find({
            relations: {
                employees: true,
            },
        });
    }

    async findOneById(id: number): Promise<Department> {
        return this.repository.findOne({
            where: { id },
            relations: {
                employees: true,
            },
        });
    }

    async findOneByName(name: string): Promise<Department> {
        return this.repository.findOne({
            where: { name: name },
        });
    }

    async update(id: number, department: Department): Promise<void> {
        await this.repository.save({ id, ...department });
    }

    async delete(id: number): Promise<void> {
        await this.repository.delete({ id });
    }
}

export default DepartmentRepository;
