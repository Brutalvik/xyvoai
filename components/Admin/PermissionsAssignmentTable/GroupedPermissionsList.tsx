import _ from "lodash";
import { Chip } from "@heroui/react";

export interface AssignedPermission {
  id: string;
  permission: string;
  category?: string; // ← add this when you build the array from server+metadata
}

interface GroupedPermissionsListProps {
  /** Array of assigned permissions (with category) */
  assignedPermissions: AssignedPermission[];

  /** Has the resource been fetched yet? */
  isFetched: boolean;

  /** Array of permission keys currently selected for revoke */
  selectedForRevoke?: string[];

  /** Called when a chip is clicked */
  onSelectPermission?: (permissionKey: string) => void;

  /** Function to display human readable label */
  translatePermission: (permissionKey: string) => string;
}

export default function GroupedPermissionsList({
  assignedPermissions,
  isFetched,
  selectedForRevoke = [],
  onSelectPermission,
  translatePermission,
}: GroupedPermissionsListProps) {
  if (!isFetched || assignedPermissions.length === 0) return null;

  const grouped = _.groupBy(assignedPermissions, "category");

  return (
    <div className="space-y-6">
      {/* Groups */}
      {Object.entries(grouped).map(([category, perms]) => (
        <div key={category} className="space-y-2">
          <h3 className="text-xs font-medium text-gray-600 dark:text-gray-400">
            {category} <span className="text-gray-400">({perms.length})</span>
          </h3>
          <div className="flex flex-wrap gap-2">
            {perms.map(({ id, permission }) => (
              <Chip
                key={id}
                className="cursor-pointer user-select-none hover:shadow-md transition-shadow"
                color={
                  selectedForRevoke.includes(permission) ? "danger" : "primary"
                }
                size="md"
                variant="flat"
                onClick={() => onSelectPermission?.(permission)}
              >
                {translatePermission(permission)}
              </Chip>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
