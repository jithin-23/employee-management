import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
} from "typeorm";
import AbstractEntity from "./abstract.entity";
import Address from "./address.entity";
import Department from "./department.entity";

export enum EmployeeRole {
    UI = "UI",
    UX = "UX",
    DEVELOPER = "DEVELOPER",
    HR = "HR",
}

@Entity()
class Employee extends AbstractEntity {
    @Column({ unique: true })
    email: string;

    @Column()
    name: string;

    @Column()
    age: number;

    @Column()
    password: string;

    @OneToOne(() => Address, (address) => address.employee, {
        cascade: true,
    })
    address: Address;

    @ManyToOne(() => Department, (department) => department.employees, {
        onDelete: "CASCADE",
    })
    department: Department;

    @Column({
        type: "enum",
        enum: EmployeeRole,
        default: EmployeeRole.DEVELOPER,
    })
    role: EmployeeRole;
}

export default Employee;
