import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Patch,
} from '@nestjs/common'
import { UserUpdatePasswordUseCase } from '../../application/usecases/user-update-password.usecase'
import { UserRequest } from '../request/user.request'

@Controller('users')
export class UserUpdatePasswordController {
  @Inject(UserUpdatePasswordUseCase)
  private readonly userUpadatePasswordUseCase: UserUpdatePasswordUseCase

  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch()
  async handle(
    @Param() id: string,
    @Body() request: UserRequest.UpdatePassword,
  ): Promise<void> {
    await this.userUpadatePasswordUseCase.execute(id, request)
  }
}
