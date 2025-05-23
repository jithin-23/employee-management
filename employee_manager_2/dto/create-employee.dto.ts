import { IsEmail, IsNotEmpty, IsNumber, isString, IsString, ValidateNested, IsEnum, MinLength , IsDate, IsDateString} from "class-validator";
import { Type } from "class-transformer";
import { CreateAddressDto } from "./create-address.dto";
import { EmployeeRole, EmployeeStatus } from "../entities/employee.entity";
import Department from "../entities/department.entity";

export class CreateEmployeeDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  age: number;
  
  @IsString()
  @MinLength(5)
  password: string;

  @ValidateNested()
  @Type( () => CreateAddressDto)
  address: CreateAddressDto;

  @IsEnum(EmployeeRole)
  role: EmployeeRole;

  @IsNumber()
  department_id: number;

  @IsEnum(EmployeeStatus)
  status: EmployeeStatus;

  @IsNumber()
  experience: number;

  @IsDateString()
  dateOfJoining: Date;
 

}