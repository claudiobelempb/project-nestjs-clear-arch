import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common'
import { UserSigninUseCase } from '../../application/usecases/user-signin.usecase'
import { UserRequest } from '../request/user.request'
import { UserResponse } from '../../application/response/user-response'

@Controller('users')
export class UserSigninController {
  @Inject(UserSigninUseCase)
  private readonly userSigninUseCase: UserSigninUseCase

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async handle(
    @Body() request: UserRequest.UserSignin,
  ): Promise<UserResponse.User> {
    return await this.userSigninUseCase.execute(request)
  }
}
