// store/slices/notificationsSlice.ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchWithAuth } from "@/utils/api";

export interface Notification {
  id: string;
  title: string;
  description: string;
  images: string[];
  created_at: string;
}

interface NotificationsState {
  items: Notification[];
  loading: boolean;
  error?: string;
}

const initialState: NotificationsState = {
  items: [],
  loading: false,
};

// Fetch all notifications
export const fetchNotifications = createAsyncThunk<Notification[]>(
  "notifications/fetch",
  async (_, thunkAPI) => {
    try {
      return await fetchWithAuth("/notifications");
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// Post a new notification (accepts FormData)
export const postNotification = createAsyncThunk<Notification, FormData>(
  "notifications/post",
  async (formData, thunkAPI) => {
    try {
      // fetchWithAuth should handle FormData correctly
      const response = await fetchWithAuth("/notifications", {
        method: "POST",
        body: formData, // <-- FormData works here
      });
      return response;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// Update notification (accepts FormData)
export const updateNotification = createAsyncThunk<
  Notification,
  { id: string; data: FormData }
>("notifications/update", async ({ id, data }, thunkAPI) => {
  try {
    const response = await fetchWithAuth(`/notifications/${id}`, {
      method: "PUT",
      body: data,
    });
    return response;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.message);
  }
});

// Delete a notification
export const deleteNotification = createAsyncThunk<string, string>(
  "notifications/delete",
  async (id, thunkAPI) => {
    try {
      await fetchWithAuth(`/notifications/${id}`, { method: "DELETE" });
      return id;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Post
      .addCase(postNotification.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(postNotification.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(postNotification.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Update
      .addCase(updateNotification.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(updateNotification.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.items.findIndex((n) => n.id === action.payload.id);
        if (index >= 0) state.items[index] = action.payload;
      })
      .addCase(updateNotification.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Delete
      .addCase(deleteNotification.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(deleteNotification.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter((n) => n.id !== action.payload);
      })
      .addCase(deleteNotification.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default notificationsSlice.reducer;
