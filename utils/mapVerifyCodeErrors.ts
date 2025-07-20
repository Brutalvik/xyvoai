// utils/mapVerifyCodeError.ts

import {
  VerifyCodeErrors,
  VerifyCodeErrorType,
} from "@/utils/VerificationErrorCodes";

export function mapVerifyCodeError(error: {
  error?: string;
  message?: string;
}): {
  type: VerifyCodeErrorType;
  status: "danger" | "warning" | "info";
  message: string;
} {
  switch (error?.error) {
    case VerifyCodeErrors.CODE_MISMATCH:
      return {
        type: VerifyCodeErrors.CODE_MISMATCH,
        status: "danger",
        message: "The verification code is incorrect.",
      };

    case VerifyCodeErrors.CODE_EXPIRED:
      return {
        type: VerifyCodeErrors.CODE_EXPIRED,
        status: "danger",
        message: "Your verification code has expired.",
      };

    case VerifyCodeErrors.USER_NOT_FOUND:
      return {
        type: VerifyCodeErrors.USER_NOT_FOUND,
        status: "danger",
        message: "No user found with this email.",
      };

    case VerifyCodeErrors.USER_ALREADY_CONFIRMED:
      return {
        type: VerifyCodeErrors.USER_ALREADY_CONFIRMED,
        status: "info",
        message: "Your email is already verified.",
      };

    case VerifyCodeErrors.INVALID_PARAMETER:
      return {
        type: VerifyCodeErrors.INVALID_PARAMETER,
        status: "warning",
        message: "User may already be confirmed. Cannot resend code.",
      };

    case VerifyCodeErrors.RATE_LIMIT_EXCEEDED:
      return {
        type: VerifyCodeErrors.RATE_LIMIT_EXCEEDED,
        status: "danger",
        message: "Too many attempts. Please try again in 10 minutes.",
      };

    default:
      return {
        type: VerifyCodeErrors.UNKNOWN,
        status: "danger",
        message:
          error?.message || "An unknown error occurred. Please try again.",
      };
  }
}
