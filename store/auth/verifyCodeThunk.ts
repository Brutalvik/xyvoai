import { createAsyncThunk } from "@reduxjs/toolkit";
import { resendVerificationCode } from "@/store/auth/thunks";
import { verifyCode } from "@/store/auth/thunks";

export const resendVerificationCodeThunk = createAsyncThunk(
  "auth/resendVerificationCode",
  async ({ email }: { email: string }, { rejectWithValue }) => {
    try {
      const response = await resendVerificationCode(email);
      return response;
    } catch (error: any) {
      return rejectWithValue(error);
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
      const response = await verifyCode(email, code);
      return response;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);
