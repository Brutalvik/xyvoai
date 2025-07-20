// store/auth/thunks.ts
import { createAsyncThunk } from "@reduxjs/toolkit";

import { CDN } from "@/config";
import { clearUser, setUser } from "@/store/slices/userSlice";
import { UsageType } from "@/components/Auth/UsageTypeModal";

type SignupForm = {
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
      const res = await fetch(`${CDN.userAuthUrl}/auth/signup`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          phone: values.countryCode + values.phone,
          password: values.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data?.message || "Signup failed");

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
    console.log("values from thunk", values);
    console.log("usageType from thunk", usageType);
    try {
      const res = await fetch(`${CDN.userAuthUrl}/auth/signup`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          phone: values.countryCode + values.phone,
          password: values.password,
          usageType,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data?.message || "Signup failed");
      if (res.status === 207) {
        return {
          isRegistered: true,
          message: "Partial Registration",
          status: 207,
        };
      }

      return {
        isRegistered: true,
        message: "User Registered Successfully",
        user: data,
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
      const res = await fetch(`${CDN.userAuthUrl}/auth/signin`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data?.isLoggedIn) {
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
  async (_, { getState, dispatch, rejectWithValue }) => {
    try {
      const state: any = getState();
      const refreshToken = state.user?.user?.refreshToken;

      if (!refreshToken) throw new Error("Missing refresh token");

      const res = await fetch(`${CDN.userAuthUrl}/auth/refresh`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ refreshToken }),
      });

      if (!res.ok) throw new Error("Refresh token failed");

      const data = await res.json();

      dispatch(setUser(data.user));

      return data.user;
    } catch (err) {
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
      const res = await fetch(`${CDN.userAuthUrl}/auth/signout`, {
        method: "POST",
        credentials: "include",
      });

      if (!res.ok) throw new Error("Sign out failed");

      // Clear user from Redux store
      dispatch(clearUser());

      return true;
    } catch (error: any) {
      return rejectWithValue(error.message || "Sign out failed");
    }
  }
);
