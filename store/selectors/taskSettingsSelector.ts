// store/selectors/taskSettingsSelectors.ts
import { RootState } from "@/store";

export const selectTaskSettings = (state: RootState) =>
  state.taskSettings.current;

export const selectTaskNamingConvention = (state: RootState) =>
  state.taskSettings.current.namingConvention;

export const selectTaskPrefix = (state: RootState) =>
  state.taskSettings.current.prefix;

export const selectTaskSuffix = (state: RootState) =>
  state.taskSettings.current.suffix;

export const selectTaskStartNumber = (state: RootState) =>
  state.taskSettings.current.startNumber;

export const selectTaskZeroPadding = (state: RootState) =>
  state.taskSettings.current.zeroPadding;

export const selectDefaultAssignee = (state: RootState) =>
  state.taskSettings.current.defaultAssignee;

export const selectDefaultPriority = (state: RootState) =>
  state.taskSettings.current.defaultPriority;

export const selectDefaultActivity = (state: RootState) =>
  state.taskSettings.current.defaultActivity;

export const selectDefaultOriginalEstimate = (state: RootState) =>
  state.taskSettings.current.defaultOriginalEstimate;

export const selectDefaultTags = (state: RootState) =>
  state.taskSettings.current.defaultTags;

export const selectDefaultView = (state: RootState) =>
  state.taskSettings.current.defaultView;

export const selectEditableTitleByDefault = (state: RootState) =>
  state.taskSettings.current.editableTitleByDefault;

export const selectEditableDescriptionByDefault = (state: RootState) =>
  state.taskSettings.current.editableDescriptionByDefault;

export const selectAllowComments = (state: RootState) =>
  state.taskSettings.current.allowComments;
