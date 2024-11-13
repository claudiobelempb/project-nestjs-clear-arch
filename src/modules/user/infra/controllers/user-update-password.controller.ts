import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common'
import { UserUpdatePasswordUseCase } from '../../application/usecases/user-update-password.usecase'
import { UserRequest } from '../request/user.request'
import { AuthGuard } from '@/modules/auth/infra/auth.guard'
@UseGuards(AuthGuard)
@Controller('users')
export class UserUpdatePasswordController {
  @Inject(UserUpdatePasswordUseCase)
  private readonly userUpadatePasswordUseCase: UserUpdatePasswordUseCase

  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch(':id')
  async handle(
    @Param('id') id: string,
    @Body() request: UserRequest.UpdatePassword,
  ): Promise<void> {
    await this.userUpadatePasswordUseCase.execute(id, request)
  }
}
