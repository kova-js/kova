import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common'
import type { Response } from 'express'
import { isString } from 'lodash'

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const res: Response = host.switchToHttp().getResponse()
    console.error(exception)
    if (exception instanceof BadRequestException) {
      const errorOption: any = exception.getResponse()
      return res.status(exception.getStatus()).send({
        code: exception.getStatus(),
        message: isString(errorOption.message) ? errorOption.message : String(errorOption.message),
      })
    }
    return res.status(exception.getStatus()).send(exception.message)
  }
}
