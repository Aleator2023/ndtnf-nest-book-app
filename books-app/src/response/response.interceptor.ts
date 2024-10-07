import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Logger } from '@nestjs/common';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        Logger.log(`Successful response: ${JSON.stringify(data)}`);
        return {
          status: 'success',
          data,
        };
      }),
      catchError((error) => {
        Logger.error(`Error occurred: ${error.message || error}`, error.stack);
        return throwError(() => ({
          status: 'fail',
          data: error.message || 'An error occurred',
        }));
      }),
    );
  }
}