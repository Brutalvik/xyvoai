// store/slices/taskSettingsThunks.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import { TaskSettings } from "@/store/slices/taskSettingsSlice";
import { fetchWithAuth } from "@/utils/api";

// Fetch current task settings
export const fetchTaskSettings = createAsyncThunk<
  TaskSettings,
  void,
  { rejectValue: string }
>("taskSettings/fetch", async (_, { rejectWithValue }) => {
  try {
    const res = await fetchWithAuth("/task-settings", {
      method: "GET",
    });
    return res.settings as TaskSettings;
  } catch (err: any) {
    return rejectWithValue(err?.message || "Failed to fetch task settings");
  }
});

// Create or update task settings
export const createOrUpdateTaskSettings = createAsyncThunk<
  TaskSettings,
  TaskSettings,
  { rejectValue: string }
>("taskSettings/save", async (settings, { rejectWithValue }) => {
  try {
    const res = await fetchWithAuth("/task-settings", {
      method: "POST", // backend can handle create or update
      body: JSON.stringify(settings),
    });
    return res.settings as TaskSettings;
  } catch (err: any) {
    return rejectWithValue(err?.message || "Failed to save task settings");
  }
});
