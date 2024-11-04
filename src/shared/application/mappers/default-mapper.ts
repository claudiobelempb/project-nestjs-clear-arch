import { SearchResult } from '@/shared/domain/repositories/utils/search-result'
import { DefaultResponse } from '../response/default-response'
import { DefaultEntity } from '@/shared/domain/entities/default-entity'
import { UserEntiry } from '@/modules/user/domain/entities/user.entity'
import { UserType } from '@/modules/user/application/response/user-response'

export namespace DefaultMapper {
  export class PaginationMapper {
    static toResponse<Item = any>(
      items: Item[],
      result: SearchResult<DefaultEntity>,
    ): DefaultResponse.PaginationResponse<Item> {
      return {
        items,
        total: result.total,
        currentPage: result.currentPage,
        lastPage: result.lastPage,
        perPage: result.perPage,
      }
    }
  }
}
