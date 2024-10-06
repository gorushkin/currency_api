type ErrorType =
  | 'ValidationError'
  | 'DatabaseError'
  | 'AuthenticationError'
  | 'AuthorizationError'
  | 'NotFoundError'
  | 'APIError'
  | 'InternalError';

class AppError extends Error {
  type: ErrorType = 'InternalError';

  constructor(
    message: string,
    public statusCode: number,
  ) {
    super(message);
    this.statusCode = statusCode;
  }
}

class ValidationError extends AppError {
  type: ErrorType = 'ValidationError';

  constructor(message: string) {
    super(message, 400);
  }
}

class APIError extends AppError {
  type: ErrorType = 'APIError';

  constructor(message: string) {
    super(message, 500);
  }
}

class DBError extends AppError {
  type: ErrorType = 'DatabaseError';

  constructor(message: string) {
    super(message, 500);
  }
}

class NotFoundError extends AppError {
  type: ErrorType = 'NotFoundError';

  constructor(message: string) {
    super(message, 404);
  }
}

export { AppError, ValidationError, APIError, DBError, NotFoundError };
