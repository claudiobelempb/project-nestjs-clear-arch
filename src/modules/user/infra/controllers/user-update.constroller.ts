import { Body, Controller, Inject, Param, Put } from '@nestjs/common'
import { UserUpdateUseCase } from '../../application/usecases/user-update.usecase'
import { UserRequest } from '../request/user.request'
import { UserResponse } from '../../application/response/user-response'
import { UserMapper } from '../../application/mapper/user-response.mapper'

@Controller('users')
export class UserUpdateController {
  @Inject(UserUpdateUseCase)
  private readonly userUpdateUseCase: UserUpdateUseCase

  @Put(':id')
  async handle(
    @Param('id') id: string,
    @Body() request: UserRequest.UserUpdate,
  ): Promise<UserResponse.User> {
    const presente = await this.userUpdateUseCase.execute(id, request)
    return UserMapper.toPresente(presente)
  }
}
