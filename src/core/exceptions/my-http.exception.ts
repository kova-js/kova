import { ErrorCode } from '@/constants/error'
import { HttpException, HttpStatus } from '@nestjs/common'
import { isUndefined } from 'lodash'

export class MyHttpExceptionData {
  code?: number
  message?: string
}

export class MyHttpException extends HttpException {
  public readonly code: number
  public readonly message: string

  constructor(expData: MyHttpExceptionData) {
    if (expData && isUndefined(expData.code)) {
      expData.code = ErrorCode.ParamsError.CODE
    }
    super(expData, HttpStatus.OK)
    this.code = expData.code
    this.message = expData.message
  }
}
