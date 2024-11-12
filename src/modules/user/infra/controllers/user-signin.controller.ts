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
import { UserSigninUseCase } from '../../application/usecases/user-signin.usecase'
import { UserRequest } from '../request/user.request'

@Controller('users')
export class UserSigninController {
  @Inject(UserSigninUseCase)
  private readonly userSigninUseCase: UserSigninUseCase

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async handle(
    @Body() request: UserRequest.Signin,
  ): Promise<UserResponse.User> {
    const presente = await this.userSigninUseCase.execute(request)
    return UserMapper.toPresente(presente)
  }
}
