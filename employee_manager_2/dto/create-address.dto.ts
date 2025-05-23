import { IsNotEmpty, IsString } from "class-validator";

export class CreateAddressDto {
  @IsNotEmpty()
  @IsString()
  line1: string;

  @IsString()
  line2: string;

  @IsString()
  houseNo: string;

  @IsNotEmpty()
  @IsString()
  pincode: number;
}