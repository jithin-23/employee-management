import { Column, Entity, OneToOne } from "typeorm";
import AbstractEntity from "./abstract.entity";
import Employee from "./employee.entity";


@Entity()
class Address extends AbstractEntity {

    @Column()
    line1:string;

    @Column()
    pincode:number;

    @OneToOne( () => Employee)
    employee:Employee
}

export default Address;