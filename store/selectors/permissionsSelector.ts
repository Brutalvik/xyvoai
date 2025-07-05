import { RootState } from "@/store";
import { SystemPermission } from "@/store/slices/permissionsSlice";

export const selectPermissions = (state: RootState): SystemPermission[] =>
  state.permissions.items;
export const isPermissionsLoading = (state: RootState) =>
  state.permissions.loading;
export const permissionsError = (state: RootState) => state.permissions.error;
export const permissionsLoaded = (state: RootState) => state.permissions;
