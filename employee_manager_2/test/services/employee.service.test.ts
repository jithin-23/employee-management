import { MockProxy, mock } from "jest-mock-extended";
import EmployeeServices from "../../services/employee.services";
import EmployeeRepository from "../../repositories/employee.repository";
import Employee from "../../entities/employee.entity";
import { when } from "jest-when";

describe("EmployeeService", () => {
    let employeeRepository: MockProxy<EmployeeRepository>;
    let employeeService: EmployeeServices;

    beforeEach(() => {
        employeeRepository = mock<EmployeeRepository>();
        employeeService = new EmployeeServices(employeeRepository);
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
});
