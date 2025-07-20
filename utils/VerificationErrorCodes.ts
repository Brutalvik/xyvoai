export const VerifyCodeErrors = {
  CODE_MISMATCH: "CodeMismatchException",
  CODE_EXPIRED: "ExpiredCodeException",
  USER_NOT_FOUND: "UserNotFoundException",
  USER_ALREADY_CONFIRMED: "NotAuthorizedException",
  INVALID_PARAMETER: "InvalidParameterException",
  RATE_LIMIT_EXCEEDED: "LimitExceededException",
  UNKNOWN: "UnknownError",
} as const;

export type VerifyCodeErrorType =
  (typeof VerifyCodeErrors)[keyof typeof VerifyCodeErrors];
