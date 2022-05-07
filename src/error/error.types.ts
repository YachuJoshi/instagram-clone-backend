import { CustomError } from "./CustomError";

export const fieldsMissingError = new CustomError({
  code: 400,
  message: "Necessary fields are missing!",
});

export const noUserError = new CustomError({
  code: 404,
  message: "User Not Found!",
});

export const wrongCredentialsError = new CustomError({
  message: "Wrong Credentials!",
});
