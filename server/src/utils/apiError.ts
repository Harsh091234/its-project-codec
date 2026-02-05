export class ApiError extends Error {
  statusCode: number;
  errors: unknown[];
  data: null;
  success: false;
  
  constructor(
    statusCode: number,
    message: string = "Something went wrong",
    errors = [],
    statck?: string,
  ) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.errors = errors;
    this.data = null;
    this.success = false;

    if (statck) {
      this.stack = statck;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}