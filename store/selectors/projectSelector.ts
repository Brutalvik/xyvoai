import { RootState } from "@/store";
import { Project } from "@/types";

export const selectProjects = (state: RootState): Project[] =>
  state.projects.items;

export const isProjectsLoading = (state: RootState) => state.projects.loading;
export const projectsError = (state: RootState) => state.projects.error;

export const selectProjectById = (id: string) => (state: RootState) =>
  state.projects.items.find((project) => project.id === id);
