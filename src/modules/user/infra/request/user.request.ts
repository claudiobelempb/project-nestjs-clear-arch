import { SearchParams } from '@/shared/domain/repositories/utils/search-params'
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export namespace UserRequest {
  export class User {
    id: string
    firstName: string
    lastName: string
    email: string
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
    items: User[]
    total?: number
    currentPage?: number
    lastPage?: number
    perPage?: number
  }
}
