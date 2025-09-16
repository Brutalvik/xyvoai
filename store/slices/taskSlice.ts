// store/slices/tasksSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../index";
import { fetchWithAuth } from "@/utils/api";

export interface Task {
  id: string;
  taskNumber: number;
  title: string;
  description: string;
  assignee: {
    id: string;
    name: string;
    avatar?: string;
  } | null;
  priority: "low" | "medium" | "high" | "critical";
  activity: string;
  originalEstimate: number;
  remaining: number;
  completed: number;
  tags: { name: string }[];
  comments: {
    userId: string;
    avatar?: string;
    comment: string;
    timestamp: string;
    name: string;
  }[];
  startDate?: string | null;
  endDate?: string | null;
  attachments?: number;
  columnId: string;
  createdBy?: string;
  createdAt: string;
  updatedAt: string;
}

interface TasksState {
  items: Task[];
  loading: boolean;
  error: string | null;
}

const initialState: TasksState = {
  items: [],
  loading: true,
  error: null,
};

// -----------------------------
// Async thunks
// -----------------------------

export const fetchTasks = createAsyncThunk<Task[], void, { state: RootState }>(
  "tasks/fetchTasks",
  async (_, thunkAPI) => {
    try {
      const data = await fetchWithAuth("/tasks");

      if (!data.success || !Array.isArray(data.tasks)) {
        throw new Error("Failed to fetch tasks");
      }

      return data.tasks;
    } catch (err: any) {
      console.error("❌ fetchTasks error:", err);
      return thunkAPI.rejectWithValue(err.message || "Failed to fetch tasks");
    }
  }
);

export const createTask = createAsyncThunk<
  Task,
  Partial<Task>,
  { state: RootState }
>("tasks/createTask", async (task, thunkAPI) => {
  try {
    const res = await fetchWithAuth("/tasks", {
      method: "POST",
      body: JSON.stringify(task),
    });

    if (!res.success) {
      throw new Error(res.error || "Failed to create task");
    }

    return res.task;
  } catch (err: any) {
    console.error("❌ createTask error:", err);
    return thunkAPI.rejectWithValue(err.message || "Failed to create task");
  }
});

export const updateTask = createAsyncThunk<
  Task,
  { id: string; updates: Partial<Task> },
  { state: RootState }
>("tasks/updateTask", async ({ id, updates }, thunkAPI) => {
  try {
    const res = await fetchWithAuth(`/tasks/${id}`, {
      method: "PATCH",
      body: JSON.stringify(updates),
    });

    if (!res.success) {
      throw new Error(res.error || "Failed to update task");
    }

    return res.task;
  } catch (err: any) {
    console.error("❌ updateTask error:", err);
    return thunkAPI.rejectWithValue(err.message || "Failed to update task");
  }
});

export const deleteTask = createAsyncThunk<
  string,
  string,
  { state: RootState }
>("tasks/deleteTask", async (id, thunkAPI) => {
  try {
    const res = await fetchWithAuth(`/tasks/${id}`, { method: "DELETE" });

    if (!res.success) {
      throw new Error(res.error || "Failed to delete task");
    }

    return id;
  } catch (err: any) {
    console.error("❌ deleteTask error:", err);
    return thunkAPI.rejectWithValue(err.message || "Failed to delete task");
  }
});

// store/slices/tasksSlice.ts

export const addCommentAsync = createAsyncThunk<
  Task,
  { taskId: string; comment: Task["comments"][0] },
  { state: RootState }
>("tasks/addCommentAsync", async ({ taskId, comment }, thunkAPI) => {
  try {
    const state = thunkAPI.getState() as RootState;
    const task = state.tasks.items.find((t: Task) => t.id === taskId);
    if (!task) throw new Error("Task not found in state");

    // Build the new comments array
    const updatedComments = [...task.comments, comment];

    const res = await fetchWithAuth(`/tasks/${taskId}`, {
      method: "PATCH",
      body: JSON.stringify({ comments: updatedComments }),
    });

    if (!res.success) {
      throw new Error(res.error || "Failed to add comment");
    }

    return res.task as Task;
  } catch (err: any) {
    console.error("❌ addCommentAsync error:", err);
    return thunkAPI.rejectWithValue(err.message || "Failed to add comment");
  }
});

// -----------------------------
// Slice
// -----------------------------
const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addComment: (
      state,
      action: PayloadAction<{ taskId: string; comment: Task["comments"][0] }>
    ) => {
      const task = state.items.find((t) => t.id === action.payload.taskId);
      if (task) {
        task.comments.push(action.payload.comment);
      }
    },
    addTag: (
      state,
      action: PayloadAction<{ taskId: string; tag: { name: string } }>
    ) => {
      const task = state.items.find((t) => t.id === action.payload.taskId);
      if (task) {
        task.tags.push(action.payload.tag);
      }
    },
    removeTag: (
      state,
      action: PayloadAction<{ taskId: string; tagIndex: number }>
    ) => {
      const task = state.items.find((t) => t.id === action.payload.taskId);
      if (task) {
        task.tags.splice(action.payload.tagIndex, 1);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.loading = false;
        state.items.unshift(action.payload);
      })
      .addCase(createTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.items.findIndex((t) => t.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.items = state.items.filter((t) => t.id !== action.payload);
      })
      .addCase(addCommentAsync.fulfilled, (state, action) => {
        const index = state.items.findIndex((t) => t.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload; // update whole task with new comments
        }
      });
  },
});

export const { addComment, addTag, removeTag } = tasksSlice.actions;
export default tasksSlice.reducer;
