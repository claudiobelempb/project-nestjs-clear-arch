export namespace MessageResponse {
  export class Message {
    id: string
    text: string
    from: string
    to: string
    isRead?: boolean
    createdAt?: Date
    updatedAt?: Date
  }
}
