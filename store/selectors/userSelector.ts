import { RootState } from "@/store";

export const selectUser = (state: RootState) => state.user.user;
export const isLoggedIn = (state: RootState) => !!state.user.user;
export const selectUserEmail = (state: RootState) => state.user.user?.email;
export const selectUserName = (state: RootState) => state.user.user?.name;
export const selectUserId = (state: RootState) => state.user.user?.id;
export const selectUserImage = (state: RootState) =>
  state.user.user?.image || null;
export const hasFetchedUser = (state: RootState) => state.user.hasFetched;
