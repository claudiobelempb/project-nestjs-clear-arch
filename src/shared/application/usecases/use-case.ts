export interface DefaultUseCase<Request, Response> {
  execute(request: Request): Response | Promise<Response>
}
