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

  static ValidationError: typeof ValidationError;
  static APIError: typeof APIError;
  static DBError: typeof DBError;
  static NotFoundError: typeof NotFoundError;

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
    super(message, 401);
  }
}

APIError.ValidationError = ValidationError;
APIError.APIError = APIError;
APIError.DBError = DBError;
APIError.DataError = NotFoundError;

export { AppError };
