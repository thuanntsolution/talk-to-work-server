import { HTTPSTATUS, HttpStatusCode } from '../../config/http.config'
import { ErrorCode } from '../enums/error-code.enum'
import { AppError } from './app-error'

export class NotFoundException extends AppError {
  constructor(message = 'Response Not Found', errorCode?: ErrorCode) {
    super(message, HTTPSTATUS.NOT_FOUND, errorCode || ErrorCode.RESOURCE_NOT_FOUND)
  }
}
export class BadRequestException extends AppError {
  constructor(message = 'Bad Request', errorCode?: ErrorCode) {
    super(message, HTTPSTATUS.BAD_REQUEST, errorCode || ErrorCode.VALIDATION_ERROR)
  }
}
export class UnauthorizedException extends AppError {
  constructor(message: 'Unauthorized', errorCode?: ErrorCode) {
    super(message, HTTPSTATUS.UNAUTHORIZED, errorCode || ErrorCode.AUTH_UNAUTHORIZED_ACCESS)
  }
}
export class InternalServerException extends AppError {
  constructor(message = 'Internal server error', errorCode?: ErrorCode) {
    super(message, HTTPSTATUS.INTERNAL_SERVER_ERROR, errorCode || ErrorCode.INTERNAL_SERVER_ERROR)
  }
}
export class HttpException extends AppError {
  constructor(message = 'Http Exception Error', statusCode: HttpStatusCode, errorCode?: ErrorCode) {
    super(message, statusCode, errorCode)
  }
}
