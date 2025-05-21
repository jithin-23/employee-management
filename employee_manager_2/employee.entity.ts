import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

// class Employee {
//     id: number;
//     email: string;
//     name: string;
//     createdAt: Date;
//     updatedAt: Date;
//   }

@Entity()
class Employee {
  @PrimaryGeneratedColumn()
  id:number;

  @Column({unique:true})
  email:string

  @Column()
  name:string
  
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export default Employee;
  