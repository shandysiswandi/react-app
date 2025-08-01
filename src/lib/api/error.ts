export class AuthError extends Error {
  constructor(message: string = "Authentication failed") {
    super(message);
    this.name = "AuthError";
  }
}

export class ValidationError extends Error {
  constructor(message: string = "Validation failed") {
    super(message);
    this.name = "ValidationError";
  }
}

export class NotFoundError extends Error {
  constructor(message: string = "Resource not found") {
    super(message);
    this.name = "NotFoundError";
  }
}

export class ServerError extends Error {
  constructor(message: string = "Internal server error") {
    super(message);
    this.name = "ServerError";
  }
}

export class UnknownApiError extends Error {
  constructor(message: string = "Unknown API error") {
    super(message);
    this.name = "UnknownApiError";
  }
}
