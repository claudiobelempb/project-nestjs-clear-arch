import { IsNotEmpty, IsString } from 'class-validator'

export namespace MessageRequest {
  export class Message {
    @IsString()
    @IsNotEmpty()
    text: string

    @IsString()
    @IsNotEmpty()
    from: string

    @IsString()
    @IsNotEmpty()
    to: string
  }

  export class Update implements Message {
    @IsString()
    @IsNotEmpty()
    text: string

    @IsString()
    @IsNotEmpty()
    from: string

    @IsString()
    @IsNotEmpty()
    to: string
  }

  export class Pagination {
    items: Message[]
    total?: number
    currentPage?: number
    lastPage?: number
    perPage?: number
  }
}
