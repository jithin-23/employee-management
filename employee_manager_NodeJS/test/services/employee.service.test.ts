import { MockProxy, mock } from "jest-mock-extended";
import EmployeeServices from "../../services/employee.services";
import EmployeeRepository from "../../repositories/employee.repository";
import Employee, {
  EmployeeRole,
  EmployeeStatus,
} from "../../entities/employee.entity";
import { when } from "jest-when";
import DepartmentServices from "../../services/department.services";
import { CreateEmployeeDto } from "../../dto/create-employee.dto";

describe("EmployeeService", () => {
  let employeeRepository: MockProxy<EmployeeRepository>;
  let departmentServices: MockProxy<DepartmentServices>;
  let employeeService: EmployeeServices;

  beforeEach(() => {
    departmentServices = mock<DepartmentServices>();
    employeeRepository = mock<EmployeeRepository>();
    employeeService = new EmployeeServices(
      employeeRepository,
      departmentServices
    );
  });

  describe("createEmployee", () => {
    it("should create employee with valid data", async () => {
      const mockCreateEmployeeDto = {
        name: "Jithin",
        email: "jithin@example.com",
        password: "securepass",
        age: 30,
        role: EmployeeRole.UI,
        department_id: 1,
        experience: 5,
        status: EmployeeStatus.ACTIVE,
        dateOfJoining: "2023-05-01T00:00:00Z",
        address: {
          line1: "Main St",
          line2: "Near Park",
          houseNo: "42A",
          pincode: 560001,
        },
      } as CreateEmployeeDto;

      const mockDepartment = { id: 1, name: "IT" };
      const expectedEmployee = {
        ...mockCreateEmployeeDto,
        id: 1,
        department: mockDepartment,
      };

      when(departmentServices.getDepartmentById)
        .calledWith(1)
        .mockResolvedValue(mockDepartment);

      when(employeeRepository.create)
        .calledWith(expect.any(Employee))
        .mockResolvedValue(expectedEmployee);

      const result = await employeeService.createEmployee(
        mockCreateEmployeeDto
      );

      expect(result.email).toBe(mockCreateEmployeeDto.email);
      expect(result.id).toBe(1);
      expect(result.department).toEqual(mockDepartment);
      expect(departmentServices.getDepartmentById).toHaveBeenCalledWith(1);
      expect(employeeRepository.create).toHaveBeenCalled();
    });
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
      when(employeeRepository.findOneById).calledWith(12).mockReturnValue(null);

      //Act
      expect(employeeService.getEmployeeById(12)).rejects.toThrow(
        "Employee not found"
      );

      //Assert
      expect(employeeRepository.findOneById).toHaveBeenCalledWith(12);
    });
  });

  describe("deleteEmployee", () => {
    it("should delete user when user with proper id exists", async () => {
      const mockEmployee = { id: 123, name: "Employee name" } as Employee;

      when(employeeRepository.findOneById)
        .calledWith(123)
        .mockReturnValue(mockEmployee);
      when(employeeRepository.delete).calledWith(123).mockReturnValue(null);

      await employeeService.deleteEmployee(mockEmployee.id);

      expect(employeeRepository.findOneById).toHaveBeenCalledWith(123);
      expect(employeeRepository.delete).toHaveBeenCalledWith(123);
    });

    it("should throw an error when user with provided id does not exist", async () => {
      //Arrange
      when(employeeRepository.findOneById)
        .calledWith(123)
        .mockReturnValue(null);
      //Act
      await expect(employeeService.deleteEmployee(123)).rejects.toThrow(
        "Employee not found"
      );

      //Assert
      expect(employeeRepository.findOneById).toHaveBeenCalledWith(123);
      expect(employeeRepository.delete).not.toHaveBeenCalled();
    });
  });
});
