export namespace MessageResponse {
  export class Message {
    id: string
    text: string
    from: string
    to: string
    isRead?: boolean
    isActive?: boolean
    active?: boolean
    createdAt?: Date
    updatedAt?: Date
  }

  export class Update implements Omit<Message, 'id'> {
    text: string
    from: string
    to: string
  }

  export class UpdateIsActive
    implements Omit<Message, 'id' | 'text' | 'from' | 'to'>
  {
    active: boolean
  }

  export class UpdateIsRead
    implements Omit<Message, 'id' | 'text' | 'from' | 'to'>
  {
    isRead: boolean
  }

  export class Pagination {
    items: Message[]
    total: number
    currentPage: number
    lastPage: number
    perPage: number
  }
}
