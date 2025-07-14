import { RootState } from "@/store";

export const selectUser = (state: RootState) => state.user.user;
export const isLoggedIn = (state: RootState) => !!state.user.isLoggedIn;
export const selectUserEmail = (state: RootState) => state.user.user?.email;
export const selectUserName = (state: RootState) => state.user.user?.name;
export const selectUserId = (state: RootState) => state.user.user?.id;
export const selectUserImage = (state: RootState) =>
  state.user.user?.image || null;
export const selectUserRole = (state: RootState) => state.user.user?.role;
export const selectUserOrgId = (state: RootState) =>
  state.user.user?.organizationId;
export const selectUserOrgName = (state: RootState) =>
  state.user.user?.organizationName;
export const selectUserPermissions = (state: RootState) =>
  state.user.user?.permissions ?? [];
export const hasFetchedUser = (state: RootState) => state.user.hasFetched;
export const isUserLoading = (state: RootState) => state.user.loading;
