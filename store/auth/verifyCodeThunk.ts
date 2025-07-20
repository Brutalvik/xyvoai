import { createAsyncThunk } from "@reduxjs/toolkit";
import { resendVerificationCode } from "@/store/auth/thunks";
import { verifyCode } from "@/store/auth/thunks";

export const resendVerificationCodeThunk = createAsyncThunk(
  "auth/resendVerificationCode",
  async ({ email }: { email: string }, { rejectWithValue }) => {
    try {
      await resendVerificationCode(email);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const verifyCodeThunk = createAsyncThunk(
  "auth/verifyCode",
  async (
    { email, code }: { email: string; code: string },
    { rejectWithValue }
  ) => {
    try {
      await verifyCode(email, code);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
