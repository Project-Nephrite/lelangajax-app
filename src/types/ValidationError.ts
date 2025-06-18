export default class ValidationError extends Error {
  public statusCode: number;
  public message: string;

  constructor(message: string, statusCode: number) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
  }

  toString() {
    return this.message;
  }
}
