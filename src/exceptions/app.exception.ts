export class ApiExceptioon extends Error {
  status: number;
  stackTrace?: Error[];

  constructor(status: number, message: string, stackTrace: Error[] = []) {
    super(message);
    this.status = status;
    this.stackTrace = stackTrace;
  }

  static UnauthorizedError(stackTrace?: Error[]) {
    return new ApiExceptioon(401, 'User is not unauthorized', stackTrace);
  }

  static ValidationError(stackTrace?: Error[]) {
    return new ApiExceptioon(400, 'Validation error', stackTrace);
  }

  static BadRequest(message: string, stackTrace?: Error[]) {
    return new ApiExceptioon(400, message, stackTrace);
  }

  static Forbidden(stackTrace?: Error[]) {
    return new ApiExceptioon(403, 'Not enough rights', stackTrace);
  }

  static NotFound(stackTrace?: Error[]) {
    return new ApiExceptioon(404, 'Nothing was found', stackTrace);
  }
}
