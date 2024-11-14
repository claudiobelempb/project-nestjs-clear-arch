import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common'
import { UserMapper } from '../../application/mapper/user-response.mapper'
import { UserResponse } from '../../application/response/user-response'
import { UserSignupUseCase } from '../../application/usecases/user-signup.usecase'
import { UserRequest } from '../request/user.request'

@Controller('users')
export class UserSingnupController {
  @Inject(UserSignupUseCase)
  private readonly userSingupUseCase: UserSignupUseCase

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async handle(
    @Body() request: UserRequest.Signup,
  ): Promise<UserResponse.User> {
    const response = await this.userSingupUseCase.execute(request)
    return UserMapper.toPresente(response)
  }
}
