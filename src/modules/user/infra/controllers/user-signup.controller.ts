import { Body, Controller, Post } from '@nestjs/common'
import { UserRequest } from '../request/user.request'
import { UserResponse } from '../../application/response/user-response'
import { UserSignupUseCase } from '../../application/usecases/user-signup.usecase'

@Controller('users')
export class UserSingnupController {
  constructor(private readonly userSingupUseCase: UserSignupUseCase.UseCase) {}

  @Post()
  async handle(
    @Body() request: UserRequest.UserSignup,
  ): Promise<UserResponse.User> {
    return this.userSingupUseCase.execute(request)
  }
}
