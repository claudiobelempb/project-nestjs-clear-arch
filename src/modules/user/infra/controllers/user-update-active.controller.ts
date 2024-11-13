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
import { UserUpdateActiveUseCase } from '../../application/usecases/user-update-active.usecase'
import { AuthGuard } from '@/modules/auth/infra/auth.guard'
@UseGuards(AuthGuard)
@Controller('users')
export class UserUpdateActiveController {
  @Inject(UserUpdateActiveUseCase)
  private readonly userUpdateActiveUseCase: UserUpdateActiveUseCase

  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch(':id')
  async handle(@Param('id') id: string, @Body() active: boolean) {
    return await this.userUpdateActiveUseCase.execute(id, active)
  }
}
