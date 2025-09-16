import { RootState } from "@/store";
import { Task } from "@/store/slices/taskSlice";

export const selectTasksByProject =
  (projectId: string) =>
  (state: RootState): Task[] =>
    (state.tasks?.items ?? []).filter((task: Task) => task.id === projectId);

export const selectTasksLoading = (state: RootState) => state.tasks.loading;
export const selectTasksError = (state: RootState) => state.tasks.error;
