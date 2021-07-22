import { Provider, ErrorHandler } from '@angular/core';

class MyErrorHandler implements ErrorHandler {
  handleError(error) {
    // do something with the exception
  }
}  

export const ErrorProvider: Provider = { provide: ErrorHandler, useClass: MyErrorHandler };
