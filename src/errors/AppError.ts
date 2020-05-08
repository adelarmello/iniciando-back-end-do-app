class AppError {
  public readonly message: string;

  public readonly statusCode: number;

  constructor(message: string, statusCOde = 400) {
    this.message = message;
    this.statusCode = statusCOde;
  }
}

export default AppError;
