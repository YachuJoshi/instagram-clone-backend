interface Props {
  code: number;
  message: string;
}

export class CustomError {
  code: number;
  message: string;

  constructor(props: Props) {
    this.code = props.code;
    this.message = props.message;
  }
}
