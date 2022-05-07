interface Props {
  code?: number;
  message: string;
}

export class CustomError {
  code: number;
  message: string;

  constructor({ code = 400, message }: Props) {
    this.code = code;
    this.message = message;
  }
}
