import { IsEmail, IsNotEmpty, IsNumber, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { CreateAddressDto } from "./create-address.dto";

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

  @ValidateNested()
  @Type( () => CreateAddressDto)
  address: CreateAddressDto


}