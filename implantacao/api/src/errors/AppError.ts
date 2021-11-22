export default class AppError {
  message: string;
  statusCode: number;

  // Erro que chegou
  constructor(message: string, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
};
