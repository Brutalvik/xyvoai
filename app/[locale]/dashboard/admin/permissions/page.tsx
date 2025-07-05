"use client";

import PermissionAssignmentTable from "@/components/Admin/PermissionsAssignmentTable";
import XLoader from "@/components/ui/XLoader";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  isPermissionsLoading,
  selectPermissions,
} from "@/store/selectors/permissionsSelector";
import { fetchSystemPermissions } from "@/store/slices/permissionsSlice";
import { useEffect } from "react";

export default function AdminPermissionsPage() {
  const dispatch = useAppDispatch();
  const permissionsLoading = useAppSelector(isPermissionsLoading);
  const permissions = useAppSelector(selectPermissions);

  useEffect(() => {
    dispatch(fetchSystemPermissions());
  }, [dispatch]);

  return (
    <div className="p-6 space-y-4">
      {permissionsLoading ? (
        <div className="flex flex-col items-center justify-center py-10 text-gray-500 dark:text-gray-400">
          <XLoader />
          <p className="mt-4 text-sm font-medium">Loading Permissions..</p>
        </div>
      ) : permissions.length > 0 ? (
        <PermissionAssignmentTable systemPermissions={permissions} />
      ) : (
        <p className="text-sm text-gray-500">No permissions found.</p>
      )}
    </div>
  );
}
