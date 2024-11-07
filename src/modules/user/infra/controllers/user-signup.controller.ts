import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common'
import { UserRequest } from '../request/user.request'
import { UserResponse } from '../../application/response/user-response'
import { UserSignupUseCase } from '../../application/usecases/user-signup.usecase'

@Controller('users')
export class UserSingnupController {
  @Inject(UserSignupUseCase)
  private readonly userSingupUseCase: UserSignupUseCase

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async handle(
    @Body() request: UserRequest.UserSignup,
  ): Promise<UserResponse.User> {
    return await this.userSingupUseCase.execute(request)
  }
}
