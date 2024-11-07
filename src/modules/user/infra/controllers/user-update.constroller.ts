import { Body, Controller, Inject, Param, Put } from '@nestjs/common'
import { UserUpdateUseCase } from '../../application/usecases/user-update.usecase'
import { UserRequest } from '../request/user.request'
import { UserResponse } from '../../application/response/user-response'

@Controller('users')
export class UserUpdateController {
  @Inject(UserUpdateUseCase)
  private readonly userUpdateUseCase: UserUpdateUseCase

  @Put()
  async handle(
    @Param() id: string,
    @Body() request: UserRequest.UserUpdate,
  ): Promise<UserResponse.User> {
    return this.userUpdateUseCase.execute(id, request)
  }
}
