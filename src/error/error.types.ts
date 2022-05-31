import { CustomError } from "./CustomError";

export const FieldsMissingError = new CustomError({
  message: "Necessary fields are missing!",
});

export const NoUserError = new CustomError({
  code: 404,
  message: "User Not Found!",
});

export const WrongCredentialsError = new CustomError({
  message: "Wrong Credentials!",
});

export const UnauthorizedError = new CustomError({
  code: 401,
  message: "Unauthorized",
});

export const ForbiddenError = new CustomError({
  code: 403,
  message: "Forbidden",
});

export const NoMediaAttachedError = new CustomError({
  message: "No Files Attached!",
});

export const DuplicateKeyError = new CustomError({
  message: "Duplicate Field",
});

export const NoPostError = new CustomError({
  code: 404,
  message: "No Such Post!",
});
