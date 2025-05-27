import { MockProxy, mock } from "jest-mock-extended";
import EmployeeServices from "../../services/employee.services";
import EmployeeRepository from "../../repositories/employee.repository";
import Employee from "../../entities/employee.entity";
import { when } from "jest-when";
import DepartmentServices from "../../services/department.services";

describe("EmployeeService", () => {
    let employeeRepository: MockProxy<EmployeeRepository>;
    let departmentServices: MockProxy<DepartmentServices>;
    let employeeService: EmployeeServices;

    beforeEach(() => {
        departmentServices = mock <DepartmentServices>();
        employeeRepository = mock<EmployeeRepository>();
        employeeService = new EmployeeServices(employeeRepository, departmentServices);
    });

    describe("getEmployeeById", () => {
        it("should return value when user with proper id exists", async () => {
            const mockEmployee = { id: 123, name: "Employee name" } as Employee;
            when(employeeRepository.findOneById)
                .calledWith(123)
                .mockReturnValue(mockEmployee);

            const user = await employeeService.getEmployeeById(mockEmployee.id);

            expect(employeeRepository.findOneById).toHaveBeenCalledWith(123);
            expect(user).toStrictEqual(mockEmployee);
        });

        it("should throw an error when user with provided id does not exist", async () => {
            //Arrange
            when(employeeRepository.findOneByEmail)
                .calledWith(12)
                .mockReturnValue(null);

            //Act
            expect(employeeService.getEmployeeById(12)).rejects.toThrow(
                "Employee not found"
            );

            //Assert
            expect(employeeRepository.findOneById).toHaveBeenCalledWith(12);
        });
    });

    // describe("deleteEmployee", () => {
    //     it("should delete user when user with proper id exists", async () => {
    //         const mockEmployee = { id: 123, name: "Employee name" } as Employee;
    //         when(employeeRepository.delete)
    //             .calledWith(123)
    //             .mockReturnValue(mockEmployee);

    //         const user = await employeeService.deleteEmployee(mockEmployee.id);

    //         expect(employeeRepository.delete).toHaveBeenCalledWith(123);
    //         expect(user).toStrictEqual(mockEmployee);
    //     });

    //     it("should throw an error when user with provided id does not exist", async () => {
    //         //Arrange
    //         when(employeeRepository.delete)
    //             .calledWith(12)
    //             .mockReturnValue(null);

    //         //Act
    //         expect(employeeService.deleteEmployee(12)).rejects.toThrow(
    //             "Employee not found"
    //         );

    //         //Assert
    //         expect(employeeRepository.delete).toHaveBeenCalledWith(12);
    //     });
    // });


});
