export class ResponseResource<TData = unknown> {
  private message: string = "Ok";
  private statusCode: number = 200;
  private success: boolean = true;

  constructor(private data: TData) {
    //
  }

  /**
   * set message
   *
   * @param message string
   * @returns this
   */
  setMessage(message: string): this {
    this.message = message;

    return this;
  }

  /**
   * set status code
   *
   * @param statusCode number
   */
  setStatusCode(statusCode: number): this {
    this.statusCode = statusCode;

    return this;
  }
}
