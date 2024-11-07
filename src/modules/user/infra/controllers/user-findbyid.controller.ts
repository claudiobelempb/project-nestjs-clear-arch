import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
} from '@nestjs/common'
import { UserFindByIdUseCase } from '../../application/usecases/user-findbyid.usecase'

@Controller('users')
export class UserFindByIDController {
  @Inject(UserFindByIdUseCase)
  private readonly userFindByIdUseCase: UserFindByIdUseCase

  @HttpCode(HttpStatus.OK)
  @Get()
  async handle(@Param() id: string) {
    return await this.userFindByIdUseCase.execute(id)
  }
}
