import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { fetchWithAuth } from "@/utils/api";
import { Project } from "@/types";

interface ProjectsState {
  items: Project[];
  loading: boolean;
  error: string | null;
}

const initialState: ProjectsState = {
  items: [],
  loading: true,
  error: null,
};

// 🔁 GET /projects
export const fetchProjects = createAsyncThunk<Project[]>(
  "projects/fetchProjects",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetchWithAuth("/projects");
      return res.projects;
    } catch (err: any) {
      return rejectWithValue(err.message || "Failed to fetch projects");
    }
  }
);

// ➕ POST /projects
export const createProject = createAsyncThunk<Project, Partial<Project>>(
  "projects/createProject",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await fetchWithAuth("/projects", {
        method: "POST",
        body: JSON.stringify(payload),
      });
      return res.project;
    } catch (err: any) {
      return rejectWithValue(err.message || "Failed to create project");
    }
  }
);

// ✏️ PATCH /projects/:id
export const updateProject = createAsyncThunk<
  Project,
  { id: string; updates: Partial<Project> }
>("projects/updateProject", async ({ id, updates }, { rejectWithValue }) => {
  try {
    const res = await fetchWithAuth(`/projects/${id}`, {
      method: "PATCH",
      body: JSON.stringify(updates),
    });
    return res.project;
  } catch (err: any) {
    return rejectWithValue(err.message || "Failed to update project");
  }
});

// ❌ DELETE /projects/:id
export const deleteProject = createAsyncThunk<string, string>(
  "projects/deleteProject",
  async (id, { rejectWithValue }) => {
    console.log("Deleting project with ID:", id);
    try {
      await fetchWithAuth(`/projects/${id}`, { method: "DELETE" });
      return id;
    } catch (err: any) {
      return rejectWithValue(err.message || "Failed to delete project");
    }
  }
);

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchProjects.fulfilled,
        (state, action: PayloadAction<Project[]>) => {
          state.items = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Create
      .addCase(
        createProject.fulfilled,
        (state, action: PayloadAction<Project>) => {
          state.items.unshift(action.payload);
        }
      )

      // Update
      .addCase(
        updateProject.fulfilled,
        (state, action: PayloadAction<Project>) => {
          const idx = state.items.findIndex((p) => p.id === action.payload.id);
          if (idx !== -1) state.items[idx] = action.payload;
        }
      )

      // Delete
      .addCase(
        deleteProject.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.items = state.items.filter((p) => p.id !== action.payload);
        }
      );
  },
});

export default projectsSlice.reducer;
