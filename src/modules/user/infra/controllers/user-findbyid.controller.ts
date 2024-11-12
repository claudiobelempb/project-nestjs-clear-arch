import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
} from '@nestjs/common'
import { UserFindByIdUseCase } from '../../application/usecases/user-findbyid.usecase'
import { UserMapper } from '../../application/mapper/user-response.mapper'

@Controller('users')
export class UserFindByIdController {
  @Inject(UserFindByIdUseCase)
  private readonly userFindByIdUseCase: UserFindByIdUseCase

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async handle(@Param('id') id: string) {
    const response = await this.userFindByIdUseCase.execute(id)
    return UserMapper.toPresente(response)
  }
}
