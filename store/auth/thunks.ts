// store/auth/thunks.ts
import { createAsyncThunk } from "@reduxjs/toolkit";

import { CDN } from "@/config";
import { clearUser, setUser } from "@/store/slices/userSlice";
import { UsageType } from "@/components/Auth/UsageTypeModal";
import { fetchWithAuth } from "@/utils/api";

type SignupForm = {
  firstName: string;
  lastName: string;
  name: string;
  email: string;
  phone: string;
  countryCode: string;
  password: string;
};

//intiaal signup
export const signupThunk = createAsyncThunk(
  "auth/signup",
  async (values: SignupForm, { rejectWithValue }) => {
    try {
      const data = await fetchWithAuth("/auth/signup", {
        method: "POST",
        body: JSON.stringify({
          firstName: values.firstName,
          lastName: values.lastName,
          name: values.name,
          email: values.email,
          phone: values.countryCode + values.phone,
          password: values.password,
        }),
      });

      return data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Signup failed");
    }
  }
);

//signup with usage type
export const signupWithUsageTypeThunk = createAsyncThunk(
  "auth/signup",
  async (
    { values, usageType }: { values: SignupForm; usageType: UsageType },
    { rejectWithValue }
  ) => {
    try {
      const res = await fetchWithAuth("/auth/signup", {
        method: "POST",
        body: JSON.stringify({
          firstName: values.firstName,
          lastName: values.lastName,
          name: values.name,
          email: values.email,
          phone: values.countryCode + values.phone,
          password: values.password,
          usageType,
        }),
      });

      // fetchWithAuth returns parsed JSON, but we still check its status manually if needed
      if (res?.status === 207) {
        return {
          isRegistered: true,
          message: "Partial Registration",
          status: 207,
        };
      }

      return {
        isRegistered: true,
        message: "User Registered Successfully",
        user: res,
        status: 200,
      };
    } catch (error: any) {
      return rejectWithValue(error.message || "Signup failed");
    }
  }
);

//Signin thunk
type SigninPayload = {
  email: string;
  password: string;
};

export const signInThunk = createAsyncThunk(
  "auth/signin",
  async (values: SigninPayload, { rejectWithValue }) => {
    try {
      const data = await fetchWithAuth("/auth/signin", {
        method: "POST",
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      });

      if (!data?.isLoggedIn) {
        throw new Error(data?.message || "Sign in failed");
      }

      return {
        isLoggedIn: true,
        user: data,
        tokenExpiresAt: data.tokenExpiresAt,
      };
    } catch (error: any) {
      return rejectWithValue(error?.message || "Sign in failed");
    }
  }
);

//refresh token
export const refreshTokenThunk = createAsyncThunk(
  "auth/refresh",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const data = await fetchWithAuth("/auth/refresh", {
        method: "POST",
      });

      dispatch(setUser(data.user));
      return data.user;
    } catch (err: any) {
      dispatch(clearUser());
      return rejectWithValue("Session expired. Please sign in again.");
    }
  }
);

//signout thunk
export const signoutThunk = createAsyncThunk(
  "auth/signout",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      await fetchWithAuth("/auth/signout", {
        method: "POST",
      });

      dispatch(clearUser());
      return true;
    } catch (error: any) {
      return rejectWithValue(error.message || "Sign out failed");
    }
  }
);

//resend verification code
export async function resendVerificationCode(email: string): Promise<void> {
  await fetchWithAuth("/auth/resend-verification", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
}

//verify code
export async function verifyCode(email: string, code: string): Promise<void> {
  const response = await fetchWithAuth("/auth/verify", {
    method: "POST",
    body: JSON.stringify({ email, code }),
  });

  return response;
}
