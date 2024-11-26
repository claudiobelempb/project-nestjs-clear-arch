import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator'

export class MessageRules {
  @MaxLength(256)
  @IsString()
  @IsNotEmpty()
  text: string

  @MaxLength(100)
  @IsString()
  @IsNotEmpty()
  from: string

  @MaxLength(100)
  @IsString()
  @IsNotEmpty()
  to: string

  @IsBoolean()
  @IsOptional()
  isRead?: boolean

  @IsBoolean()
  @IsOptional()
  isActive?: boolean

  @IsDate()
  @IsOptional()
  createdAt?: Date

  @IsDate()
  @IsOptional()
  updatedAt?: Date

  constructor({
    text,
    from,
    to,
    isRead,
    isActive,
    createdAt,
    updatedAt,
  }: MessageRules) {
    Object.assign(this, {
      text,
      from,
      to,
      isRead,
      isActive,
      createdAt,
      updatedAt,
    })
  }
}
