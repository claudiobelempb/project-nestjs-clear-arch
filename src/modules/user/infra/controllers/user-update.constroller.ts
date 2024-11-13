import { Body, Controller, Inject, Param, Put, UseGuards } from '@nestjs/common'
import { UserMapper } from '../../application/mapper/user-response.mapper'
import { UserUpdateUseCase } from '../../application/usecases/user-update.usecase'
import { UserPresenter } from '../presenters/user.presenter'
import { UserRequest } from '../request/user.request'
import { AuthGuard } from '@/modules/auth/infra/auth.guard'
@UseGuards(AuthGuard)
@Controller('users')
export class UserUpdateController {
  @Inject(UserUpdateUseCase)
  private readonly userUpdateUseCase: UserUpdateUseCase

  @Put(':id')
  async handle(
    @Param('id') id: string,
    @Body() request: UserRequest.Update,
  ): Promise<UserPresenter> {
    const response = await this.userUpdateUseCase.execute(id, request)
    return UserMapper.toPresente(response)
  }
}
