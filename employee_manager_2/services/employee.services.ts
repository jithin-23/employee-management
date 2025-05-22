import { CreateAddressDto } from "../dto/create-address.dto";
import Address from "../entities/address.entity";
import Employee from "../entities/employee.entity";
import EmployeeRepository from "../repositories/employee.repository";

class EmployeeServices {
  constructor(private employeeRepository: EmployeeRepository) {}

  async createEmployee(
    name: string,
    email: string,
    age: number,
    address: CreateAddressDto
  ): Promise<Employee> {

    const newAddress = new Address();
    newAddress.line1 = address.line1;
    newAddress.pincode = Number(address.pincode);

    const newEmployee = new Employee();
    newEmployee.name = name;
    newEmployee.email = email;
    newEmployee.age = Number(age);
    newEmployee.address = newAddress;
    return this.employeeRepository.create(newEmployee);
  }

  async getAllEmployees(): Promise<Employee[]> {
    return this.employeeRepository.findMany();
  }

  async getEmployeeById(id: number): Promise<Employee> {
    return this.employeeRepository.findOneById(id);
  }

  async updateEmployee(id: number, email: string, name: string, age:number): Promise<void> {
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
