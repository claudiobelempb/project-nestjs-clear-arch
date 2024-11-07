import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Patch,
} from '@nestjs/common'
import { UserUpdateActiveUseCase } from '../../application/usecases/user-update-active.usecase'

@Controller('users')
export class UserUpdateActiveController {
  @Inject(UserUpdateActiveUseCase)
  private readonly userUpdateActiveUseCase: UserUpdateActiveUseCase

  @Patch()
  @HttpCode(HttpStatus.NO_CONTENT)
  async handle(@Param() id: string, @Body() active: boolean) {
    return await this.userUpdateActiveUseCase.execute(id, active)
  }
}
