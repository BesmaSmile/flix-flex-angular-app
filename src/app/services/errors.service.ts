import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ErrorsService {
  handleGeneralError(error: any): never {
    switch (error?.error?.errorCode) {
      case 'NOT_FOUND':
        throw new Error('Resource not found');
      case 'SERVER_ERROR':
        throw new Error('Something went wrong');
      default:
        throw new Error('Unknown error');
    }
  }

  handleUserErrors(error: any): never {
    switch (error?.error?.errorCode) {
      case 'EXISTING_USERNAME':
        throw new Error('Username already exists');
      case 'INVALID_CREDENTIALS':
        throw new Error('Wrong username or password');
      default:
        this.handleGeneralError(error);
    }
  }

  handleMovieErrors(error: any): never {
    switch (error?.error?.errorCode) {
      case 'NOT_FOUND':
        throw new Error('Movie not found');
      default:
        this.handleGeneralError(error);
    }
  }

  handleTvShowErrors(error: any) {
    switch (error?.error?.errorCode) {
      case 'NOT_FOUND':
        throw new Error('TV Show not found');
      default:
        this.handleGeneralError(error);
    }
  }
}
