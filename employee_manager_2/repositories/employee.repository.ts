import { Repository } from "typeorm";
import Employee from "../entities/employee.entity";

class EmployeeRepository {
    constructor(private repository: Repository<Employee>) {}

    async create(employee: Employee): Promise<Employee> {
        return this.repository.save(employee);
    }

    async findMany(): Promise<Employee[]> {
        return this.repository.find({
            relations: {
                address: true,
            },
        });
    }

    async findOneById(id: number): Promise<Employee> {
        return this.repository.findOne({
            where: { id },
            relations: {
                address: true,
            },
        }); // {id} = {id:id}
    }

    

    async findOneByEmail(email: string): Promise<Employee> {
        return this.repository.findOne({
            where: { email: email },
        });
    }

    async update(id: number, employee: Employee): Promise<void> {
        await this.repository.save({ id, ...employee });

        //Equivalent to
        /* await this.repository.save({
        id,
        name: employee.name,
        email: employee.email
    }) */
    }

    async delete(id: number): Promise<void> {
        await this.repository.delete({ id });
    }
}

export default EmployeeRepository;
