import { CustomError } from "./CustomError";

export const fieldsMissingError = new CustomError({
  message: "Necessary fields are missing!",
});

export const noUserError = new CustomError({
  code: 404,
  message: "User Not Found!",
});

export const wrongCredentialsError = new CustomError({
  message: "Wrong Credentials!",
});

export const unauthorizedError = new CustomError({
  code: 401,
  message: "Unauthorized",
});

export const forbiddenError = new CustomError({
  code: 403,
  message: "Forbidden",
});
