export class ApiResponse<T = unknown> {
  statusCode: number;
  message: string;
  data: T;
  success: true;

  constructor(statusCode: number, message: string = "Success", data: T) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.success = true;
  }
}
