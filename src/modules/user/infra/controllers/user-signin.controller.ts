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
import { AuthService } from '@/modules/auth/infra/auth.service'

@Controller('users')
export class UserSigninController {
  @Inject(UserSigninUseCase)
  private readonly userSigninUseCase: UserSigninUseCase

  @Inject(AuthService)
  private readonly authService: AuthService

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async handle(
    @Body() request: UserRequest.Signin,
  ): Promise<UserResponse.User> {
    const response = await this.userSigninUseCase.execute(request)
    return UserMapper.toPresente(response)
  }
}
