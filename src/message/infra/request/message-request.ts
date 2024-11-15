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
}
