// store/slices/taskSettingsSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store";

export interface TaskSettings {
  namingConvention: "sequential" | "date" | "uuid" | "projectBased";
  prefix?: string;
  suffix?: string;
  startNumber?: number;
  zeroPadding?: number;

  defaultAssignee?: string;
  defaultPriority?: "low" | "medium" | "high" | "critical";
  defaultActivity?: string;
  defaultOriginalEstimate?: number;
  defaultTags?: string[];

  defaultView?: "kanban" | "table" | "gantt" | "createTask";
  editableTitleByDefault?: boolean;
  editableDescriptionByDefault?: boolean;
  allowComments?: boolean;
}

const initialState: { current: TaskSettings } = {
  current: {
    namingConvention: "uuid",
    prefix: "",
    suffix: "",
    startNumber: 1,
    zeroPadding: 3,

    defaultAssignee: undefined,
    defaultPriority: "medium",
    defaultActivity: "Development",
    defaultOriginalEstimate: 8,
    defaultTags: [],

    defaultView: "createTask",
    editableTitleByDefault: true,
    editableDescriptionByDefault: true,
    allowComments: true,
  },
};

const taskSettingsSlice = createSlice({
  name: "taskSettings",
  initialState,
  reducers: {
    setNamingConvention(
      state,
      action: PayloadAction<TaskSettings["namingConvention"]>
    ) {
      state.current.namingConvention = action.payload;
    },
    setPrefix(state, action: PayloadAction<string>) {
      state.current.prefix = action.payload;
    },
    setSuffix(state, action: PayloadAction<string>) {
      state.current.suffix = action.payload;
    },
    setStartNumber(state, action: PayloadAction<number>) {
      state.current.startNumber = action.payload;
    },
    setZeroPadding(state, action: PayloadAction<number>) {
      state.current.zeroPadding = action.payload;
    },
    setDefaultAssignee(state, action: PayloadAction<string>) {
      state.current.defaultAssignee = action.payload;
    },
    setDefaultPriority(
      state,
      action: PayloadAction<TaskSettings["defaultPriority"]>
    ) {
      state.current.defaultPriority = action.payload;
    },
    setDefaultActivity(state, action: PayloadAction<string>) {
      state.current.defaultActivity = action.payload;
    },
    setDefaultOriginalEstimate(state, action: PayloadAction<number>) {
      state.current.defaultOriginalEstimate = action.payload;
    },
    setDefaultTags(state, action: PayloadAction<string[]>) {
      state.current.defaultTags = action.payload;
    },
    setDefaultView(state, action: PayloadAction<TaskSettings["defaultView"]>) {
      state.current.defaultView = action.payload;
    },
    setEditableTitleByDefault(state, action: PayloadAction<boolean>) {
      state.current.editableTitleByDefault = action.payload;
    },
    setEditableDescriptionByDefault(state, action: PayloadAction<boolean>) {
      state.current.editableDescriptionByDefault = action.payload;
    },
    setAllowComments(state, action: PayloadAction<boolean>) {
      state.current.allowComments = action.payload;
    },
    setAllSettings(state, action: PayloadAction<Partial<TaskSettings>>) {
      state.current = { ...state.current, ...action.payload };
    },
  },
});

export default taskSettingsSlice.reducer;
