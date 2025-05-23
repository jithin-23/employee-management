import { IsEmail, isEnum, IsNotEmpty, IsNumber, isString, IsString, ValidateNested, IsEnum, MinLength } from "class-validator";
import { Type } from "class-transformer";
import { CreateAddressDto } from "./create-address.dto";
import { EmployeeRole } from "../entities/employee.entity";

export class UpdateEmployeeDto {
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
 

}