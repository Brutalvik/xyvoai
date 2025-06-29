// store/auth/thunks.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import { CDN } from "@/config";

type SignupForm = {
  name: string;
  email: string;
  phone: string;
  countryCode: string;
  password: string;
};

export const signupThunk = createAsyncThunk(
  "auth/signup",
  async (values: SignupForm, { rejectWithValue }) => {
    try {
      const res = await fetch(`${CDN.userAuthUrl}`, {
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

export const signupWithUsageTypeThunk = createAsyncThunk(
  "auth/signup",
  async (
    {
      values,
      usageType,
    }: { values: SignupForm; usageType: "personal" | "team" },
    { rejectWithValue }
  ) => {
    try {
      const res = await fetch(`${CDN.userAuthUrl}`, {
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

      return data;
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

export const signinThunk = createAsyncThunk(
  "auth/signin",
  async (values: SigninPayload, { rejectWithValue }) => {
    try {
      const res = await fetch(`${CDN.userAuthUrl}/signin`, {
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
      if (!res.ok) throw new Error(data?.message || "Sign in failed");

      return data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Sign in failed");
    }
  }
);
