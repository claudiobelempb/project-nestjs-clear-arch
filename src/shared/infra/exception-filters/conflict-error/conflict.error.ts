import { ConfictError } from '@/shared/domain/errors/conflict-error'
import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common'
import { Response } from 'express'

@Catch(ConfictError)
export class ConflictErrorFilter implements ExceptionFilter {
  catch(exception: ConfictError, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()

    response.status(409).send({
      statusCode: 409,
      error: 'Conflict',
      message: exception.message,
    })
  }
}
