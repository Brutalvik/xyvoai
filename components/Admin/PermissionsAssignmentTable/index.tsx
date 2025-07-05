// components/PermissionAssignmentEnterprise.tsx
"use client";

import { useEffect, useState } from "react";
import {
  Select,
  SelectItem,
  Input,
  Button,
  Chip,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  assignPermission,
  fetchUserPermissions,
  removePermission,
} from "@/store/slices/permissionsSlice";
import { SystemPermission } from "@/types";
import { ChevronUp, ChevronDown, ChevronsUpDown } from "lucide-react";
import { selectUserId } from "@/store/selectors";

type ResourceType = "user" | "team" | "project";
const resourceTypes: ResourceType[] = ["user", "team", "project"];

interface PermissionsProps {
  systemPermissions: SystemPermission[];
}

export default function PermissionAssignmentEnterprise({
  systemPermissions,
}: PermissionsProps) {
  const dispatch = useAppDispatch();
  const currentUserId = useAppSelector(selectUserId);
  const [resourceType, setResourceType] = useState<ResourceType>("user");
  const [resourceId, setResourceId] = useState("");
  const [selectedPermission, setSelectedPermission] = useState("");
  const [userData, setUserData] = useState<any>(null);
  const [assignedPermissions, setAssignedPermissions] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] =
    useState<keyof SystemPermission>("category");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    if (!resourceId) return;
    dispatch(fetchUserPermissions(resourceId)).then((res: any) => {
      if (res.payload) {
        setUserData(res.payload);
        setAssignedPermissions(
          res.payload.permissions.map(
            (p: { permission: string }) => p.permission
          )
        );
      } else {
        setUserData(null);
        setAssignedPermissions([]);
      }
    });
  }, [resourceType, resourceId, dispatch]);

  const handleAssign = () => {
    if (!selectedPermission || !resourceId) return;
    dispatch(
      assignPermission({
        user_id: resourceType === "user" ? resourceId : "",
        resource_type: resourceType,
        resource_id: resourceId,
        permission: selectedPermission,
        granted_by: currentUserId as string,
      })
    ).then(() => {
      setSelectedPermission("");
      dispatch(fetchUserPermissions(resourceId)).then((res: any) => {
        setUserData(res.payload);
        setAssignedPermissions(
          res.payload.permissions.map(
            (p: { permission: string }) => p.permission
          )
        );
      });
    });
  };

  const handleRevoke = (perm: string) => {
    dispatch(removePermission(perm)).then(() => {
      setAssignedPermissions((prev) => prev.filter((p) => p !== perm));
    });
  };

  const handleSort = (column: keyof SystemPermission) => {
    if (sortColumn === column) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const filteredPermissions = [...systemPermissions]
    .filter((perm) =>
      [perm.label, perm.key, perm.category, perm.description]
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const valA = (a[sortColumn] || "").toString().toLowerCase();
      const valB = (b[sortColumn] || "").toString().toLowerCase();
      return sortDirection === "asc"
        ? valA.localeCompare(valB)
        : valB.localeCompare(valA);
    });

  return (
    <div className="space-y-10 text-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">User Permissions</h2>
        <Button size="sm" variant="ghost" onPress={onOpen}>
          View Permission Registry
        </Button>
      </div>

      {/* Assignment Form */}
      <div className="bg-background shadow-md border border-border rounded-2xl p-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Select
            label="Resource Type"
            selectedKeys={new Set([resourceType])}
            onSelectionChange={(keys) =>
              setResourceType(Array.from(keys)[0] as ResourceType)
            }
          >
            {resourceTypes.map((type) => (
              <SelectItem key={type}>{type}</SelectItem>
            ))}
          </Select>

          <Input
            label="Resource ID"
            value={resourceId}
            onChange={(e) => setResourceId(e.target.value)}
          />

          <Select
            label="Permission"
            items={systemPermissions}
            selectedKeys={[selectedPermission]}
            onSelectionChange={(keys) =>
              setSelectedPermission(String(Array.from(keys)[0]))
            }
          >
            {(perm) => <SelectItem key={perm.key}>{perm.label}</SelectItem>}
          </Select>

          <Button
            color="primary"
            variant="shadow"
            onPress={handleAssign}
            isDisabled={!resourceId || !selectedPermission}
            className="self-end"
          >
            Assign
          </Button>
        </div>
      </div>

      {/* Permission Chips */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Assigned Permissions</h3>
        {assignedPermissions.length === 0 ? (
          <p className="text-foreground-400 italic">None assigned.</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {assignedPermissions.map((perm, index) => (
              <Chip
                key={index}
                size="md"
                variant="flat"
                color="primary"
                onClose={() => handleRevoke(perm)}
              >
                {perm}
              </Chip>
            ))}
          </div>
        )}
      </div>

      {/* User Info */}
      {userData && (
        <div className="bg-muted p-6 rounded-xl border border-border shadow-sm max-w-5xl">
          <h3 className="text-lg font-semibold mb-4">User Profile</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <div className="text-xs font-semibold text-foreground-400">
                Name
              </div>
              <div>{userData.name}</div>
            </div>
            <div>
              <div className="text-xs font-semibold text-foreground-400">
                Email
              </div>
              <div>{userData.email}</div>
            </div>
            <div>
              <div className="text-xs font-semibold text-foreground-400">
                Phone
              </div>
              <div>{userData.phone}</div>
            </div>
            <div>
              <div className="text-xs font-semibold text-foreground-400">
                Role
              </div>
              <div>{userData.role}</div>
            </div>
            <div>
              <div className="text-xs font-semibold text-foreground-400">
                Plan
              </div>
              <div>{userData.plan}</div>
            </div>
            <div>
              <div className="text-xs font-semibold text-foreground-400">
                Organization
              </div>
              <div className="break-all text-xs text-foreground-600">
                {userData.organization_id}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Permission Modal */}
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        scrollBehavior="inside"
      >
        <ModalContent className="max-w-6xl">
          {(onClose) => (
            <>
              <ModalHeader>All System Permissions</ModalHeader>
              <ModalBody>
                <Input
                  placeholder="Search permissions..."
                  size="sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="mb-4"
                />
                <Table isStriped removeWrapper>
                  <TableHeader>
                    {["label", "key", "description", "category"].map((key) => (
                      <TableColumn key={key}>
                        <button
                          onClick={() =>
                            handleSort(key as keyof SystemPermission)
                          }
                          className="flex items-center gap-1 text-sm font-semibold"
                        >
                          {key.charAt(0).toUpperCase() + key.slice(1)}
                          {sortColumn === key ? (
                            sortDirection === "asc" ? (
                              <ChevronUp className="w-4 h-4" />
                            ) : (
                              <ChevronDown className="w-4 h-4" />
                            )
                          ) : (
                            <ChevronsUpDown className="w-4 h-4 opacity-40" />
                          )}
                        </button>
                      </TableColumn>
                    ))}
                  </TableHeader>
                  <TableBody>
                    {filteredPermissions.map((perm) => (
                      <TableRow key={perm.key}>
                        <TableCell>{perm.label}</TableCell>
                        <TableCell>{perm.key}</TableCell>
                        <TableCell>{perm.description}</TableCell>
                        <TableCell>{perm.category}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ModalBody>
              <ModalFooter>
                <Button variant="flat" color="danger" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
