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
  loading: true,
  error: null,
};

export const fetchSystemPermissions = createAsyncThunk<
  SystemPermission[],
  void,
  { state: RootState }
>("permissions/fetchSystemPermissions", async (_, thunkAPI) => {
  try {
    const data = await fetchWithAuth("/permissions");
    if (!data.success) throw new Error("Failed to fetch permissions");

    if (!Array.isArray(data.permissions)) {
      throw new Error("Invalid response: permissions not found");
    }

    return data.permissions;
  } catch (err: any) {
    console.error("❌ Permissions fetch error:", err);
    return thunkAPI.rejectWithValue(
      err.message || "Error fetching permissions"
    );
  }
});

export const fetchUserPermissions = createAsyncThunk<
  any[], // update with real type if needed
  string,
  { state: RootState }
>("permissions/fetchUserPermissions", async (userId, thunkAPI) => {
  try {
    const data = await fetchWithAuth(`/user-permissions/user/${userId}`);

    if (!data.success || !Array.isArray(data.user_permissions)) {
      throw new Error("Invalid response: permissions not found");
    }

    return data.user_permissions;
  } catch (err: any) {
    console.error("❌ fetchUserPermissions error:", err);
    return thunkAPI.rejectWithValue(
      err.message || "Failed to fetch user permissions"
    );
  }
});

export const assignPermission = createAsyncThunk<
  any,
  {
    user_id: string;
    resource_type: string;
    resource_id: string;
    permission: string;
    granted_by: string;
  }
>("permissions/assignPermission", async (payload, thunkAPI) => {
  try {
    const res = await fetchWithAuth("/user-permissions", {
      method: "POST",
      body: JSON.stringify({ ...payload }),
    });
    if (!res.ok) throw new Error("Failed to assign permission");
    const data = await res.json();
    return data.user_permission;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(
      err.message || "Error assigning permission"
    );
  }
});

export const removePermission = createAsyncThunk<any, string>(
  "permissions/removePermission",
  async (permissionId, thunkAPI) => {
    try {
      const res = await fetchWithAuth(`/user-permissions/${permissionId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to remove permission");
      return permissionId;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.message || "Error removing permission"
      );
    }
  }
);

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
