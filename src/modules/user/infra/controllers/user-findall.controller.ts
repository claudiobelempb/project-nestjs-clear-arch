import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Query,
} from '@nestjs/common'
import { UserResponse } from '../../application/response/user-response'
import { UserFindAllUseCase } from '../../application/usecases/user-findall.usecase'
import { UserRequest } from '../request/user.request'

@Controller('users')
export class UserFindAllController {
  @Inject(UserFindAllUseCase)
  private readonly userFindAllUseCase: UserFindAllUseCase

  @HttpCode(HttpStatus.OK)
  @Get()
  async handle(
    @Query() request: UserRequest.Pagination,
  ): Promise<UserResponse.Pagination> {
    return await this.userFindAllUseCase.execute(request)
  }
}
