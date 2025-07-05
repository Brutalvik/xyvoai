import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../index";
import { fetchWithAuth } from "@/utils/api";

export interface SystemPermission {
  id: string;
  name: string;
  description?: string;
  created_at: string;
}

interface PermissionsState {
  items: SystemPermission[];
  loading: boolean;
  error: string | null;
}

const initialState: PermissionsState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchSystemPermissions = createAsyncThunk<
  SystemPermission[],
  void,
  { state: RootState }
>("permissions/fetchSystemPermissions", async (_, thunkAPI) => {
  try {
    const res = await fetchWithAuth("/permissions");
    if (!res.ok) throw new Error("Failed to fetch permissions");
    const data = await res.json();
    return data.permissions;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(
      err.message || "Error fetching permissions"
    );
  }
});

const permissionsSlice = createSlice({
  name: "permissions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSystemPermissions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSystemPermissions.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchSystemPermissions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default permissionsSlice.reducer;
