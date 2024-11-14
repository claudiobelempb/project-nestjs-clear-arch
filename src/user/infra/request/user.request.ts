import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator'

export namespace UserRequest {
  export class User {
    @IsString()
    @IsNotEmpty()
    id: string

    @IsString()
    @IsNotEmpty()
    firstName: string

    @IsString()
    @IsNotEmpty()
    lastName: string

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsString()
    @IsNotEmpty()
    password: string
  }

  export class Signup implements Omit<User, 'id'> {
    @IsString()
    @IsNotEmpty()
    firstName: string

    @IsString()
    @IsNotEmpty()
    lastName: string

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsString()
    @IsNotEmpty()
    password: string
  }

  export class Signin implements Omit<User, 'id' | 'firstName' | 'lastName'> {
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsString()
    @IsNotEmpty()
    password: string
  }

  export class Update implements Omit<User, 'id' | 'email' | 'password'> {
    @IsString()
    @IsNotEmpty()
    firstName: string

    @IsString()
    @IsNotEmpty()
    lastName: string
  }

  export class UpdatePassword
    implements Omit<User, 'id' | 'firstName' | 'lastName' | 'email'>
  {
    @IsString()
    @IsNotEmpty()
    password: string

    @IsString()
    @IsNotEmpty()
    oldPassword: string
  }

  export class Pagination {
    @IsOptional()
    items: User[]

    @IsOptional()
    total?: number

    @IsOptional()
    currentPage?: number

    @IsOptional()
    lastPage?: number

    @IsOptional()
    perPage?: number
  }
}
