import { Get, HttpCode, HttpStatus, Inject, Query } from '@nestjs/common'
import { UserFindAllUseCase } from '../../application/usecases/user-findall.usecase'
import { UserRequest } from '../request/user.request'
import { UserResponse } from '../../application/response/user-response'

export class UserFindAllController {
  @Inject(UserFindAllUseCase)
  private readonly userFindAllUseCase: UserFindAllUseCase

  @HttpCode(HttpStatus.OK)
  @Get()
  async handle(
    @Query() request: UserRequest.Search,
  ): Promise<UserResponse.Pagination> {
    return await this.userFindAllUseCase.execute(request)
  }
}
