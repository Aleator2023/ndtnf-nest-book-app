import { ExceptionFilter, Catch, ArgumentsHost, HttpException, BadRequestException, Logger } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    
    const status = exception instanceof HttpException ? exception.getStatus() : 500;
    const isValidationError = exception instanceof BadRequestException;

    Logger.error(`Exception caught: ${JSON.stringify(exception, null, 2)}`, exception.stack);

    let errorResponse = {
      timestamp: new Date().toISOString(),
      status: 'fail',
      data: 'Internal server error',
      code: status,
    };

    if (exception instanceof HttpException) {
      const responseMessage = exception.getResponse();
      if (typeof responseMessage === 'object' && responseMessage['message']) {
        errorResponse.data = Array.isArray(responseMessage['message'])
          ? responseMessage['message'].join('; ')
          : responseMessage['message'];
      } else {
        errorResponse.data = exception.message;
      }
    }

    if (isValidationError) {
      const validationResponse = exception.getResponse() as any;
      errorResponse.data = validationResponse.message || 'Validation failed';
    }

    response.status(status).json(errorResponse);
  }
}