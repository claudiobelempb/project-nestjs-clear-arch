import {
  IsNotEmpty,
  IsString,
  MaxLength,
  IsEmail,
  IsOptional,
  IsDate,
  IsBoolean,
} from 'class-validator'
import { UserProps } from '../entities/user.entity'
import { ClassValidatorFields } from '@/shared/domain/validators/class-validator-fields'

export class UserRoles {
  @MaxLength(32)
  @IsString()
  @IsNotEmpty()
  firstName: string

  @MaxLength(32)
  @IsString()
  @IsNotEmpty()
  lastName: string

  @MaxLength(100)
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string

  @MaxLength(100)
  @IsString()
  @IsNotEmpty()
  password: string

  @IsBoolean()
  @IsOptional()
  active?: boolean

  @IsDate()
  @IsOptional()
  createdAt?: Date

  @IsDate()
  @IsOptional()
  updatedAt?: Date

  constructor({
    firstName,
    lastName,
    email,
    password,
    createdAt,
    updatedAt,
  }: UserProps) {
    Object.assign(this, {
      firstName,
      lastName,
      email,
      password,
      createdAt,
      updatedAt,
    })
  }
}
