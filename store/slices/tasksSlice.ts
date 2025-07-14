import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "@/store";
import { fetchWithAuth } from "@/utils/api";

export interface Task {
  id: string;
  projectId: string;
  title: string;
  status: "new" | "active" | "staging" | "deployed";
  visibility: "private" | "public";
  ai_tasks?: boolean;
  assignee?: string;
  effort?: number;
  issueUrl?: string;
  progress?: number;
  priority?: "low" | "medium" | "high" | "critical";
}

interface TasksState {
  items: Task[];
  loading: boolean;
  error: string | null;
}

const initialState: TasksState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchTasks = createAsyncThunk<
  Task[],
  string,
  { state: RootState }
>("tasks/fetchTasks", async (projectId, { rejectWithValue }) => {
  try {
    const res = await fetchWithAuth(`/projects/${projectId}/tasks`);

    return res.tasks;
  } catch (err: any) {
    return rejectWithValue(err.message || "Failed to fetch tasks");
  }
});

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default tasksSlice.reducer;
