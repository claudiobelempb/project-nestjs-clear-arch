import { Exclude, Expose, Transform } from 'class-transformer'

export namespace DefaultPresenter {
  export type PaginationProps = {
    currentPage: number
    perPage: number
    lastPage: number
    total: number
  }

  export class Pagination {
    @Transform(({ value }) => parseInt(value))
    currentPage: number
    @Transform(({ value }) => parseInt(value))
    perPage: number
    @Transform(({ value }) => parseInt(value))
    lastPage: number
    @Transform(({ value }) => parseInt(value))
    total: number

    constructor(props: PaginationProps) {
      this.currentPage = props.currentPage
      this.perPage = props.perPage
      this.lastPage = props.lastPage
      this.total = props.total
    }
  }

  export abstract class Collection<T> {
    @Exclude()
    protected pagination: Pagination
    constructor(props: Pagination) {
      this.pagination = new Pagination(props)
    }

    @Expose({ name: 'meta' })
    get meta() {
      return this.pagination
    }

    abstract get data(): T[]
  }
}
