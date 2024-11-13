import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Query,
  UseGuards,
} from '@nestjs/common'
import { UserMapper } from '../../application/mapper/user-response.mapper'
import { UserFindAllUseCase } from '../../application/usecases/user-findall.usecase'
import { UserCollectionPresenter } from '../presenters/user.presenter'
import { UserRequest } from '../request/user.request'
import { AuthGuard } from '@/modules/auth/infra/auth.guard'
@UseGuards(AuthGuard)
@Controller('users')
export class UserFindAllController {
  @Inject(UserFindAllUseCase)
  private readonly userFindAllUseCase: UserFindAllUseCase

  @HttpCode(HttpStatus.OK)
  @Get()
  async handle(
    @Query() request: UserRequest.Pagination,
  ): Promise<UserCollectionPresenter> {
    const response = await this.userFindAllUseCase.execute(request)
    return UserMapper.toPaginationPresente(response)
  }
}
