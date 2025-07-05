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
  addToast,
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
  const [assignedPermissions, setAssignedPermissions] = useState<
    { id: string; permission: string }[]
  >([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] =
    useState<keyof SystemPermission>("category");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const confirmModal = useDisclosure();
  const [pendingDelete, setPendingDelete] = useState<{
    id: string;
    permission: string;
  } | null>(null);

  useEffect(() => {
    if (!resourceId) return;
    dispatch(fetchUserPermissions(resourceId)).then((res: any) => {
      if (res.payload) {
        setUserData(res.payload);
        setAssignedPermissions(
          res.payload.permissions.map(
            (p: { id: string; permission: string }) => ({
              id: p.id,
              permission: p.permission,
            })
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
            (p: { id: string; permission: string }) => ({
              id: p.id,
              permission: p.permission,
            })
          )
        );
      });
      addToast({
        title: "Permission Assigned",
        description: `'${selectedPermission}' has been granted.`,
        color: "success",
      });
    });
  };

  const confirmRevoke = (id: string, permission: string) => {
    setPendingDelete({ id, permission });
    confirmModal.onOpen();
  };

  const handleRevoke = () => {
    if (!pendingDelete) return;
    const { id, permission } = pendingDelete;

    setAssignedPermissions((prev) => prev.filter((p) => p.id !== id));

    let undo = false;
    const timeout = setTimeout(() => {
      if (!undo) {
        dispatch(removePermission(id)).catch(() => {
          addToast({
            title: "Error",
            description: `Failed to revoke '${permission}'.`,
            color: "danger",
          });
        });
      }
    }, 3000);

    addToast({
      title: "Permission Revoked",
      description: `'${permission}' was removed.`,
      color: "warning",
      endContent: (
        <div className="flex gap-2 mt-2">
          <Button
            size="sm"
            variant="bordered"
            color="primary"
            onPress={() => {
              undo = true;
              clearTimeout(timeout);
              setAssignedPermissions((prev) => [...prev, { id, permission }]);
            }}
          >
            Undo
          </Button>
        </div>
      ),
    });

    confirmModal.onClose();
    setPendingDelete(null);
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
            size="lg"
            onPress={handleAssign}
            isDisabled={!resourceId || !selectedPermission}
            className="self-end mb-1"
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
            {assignedPermissions.map(({ id, permission }, index) => (
              <Chip
                key={index}
                size="md"
                variant="flat"
                color="primary"
                onClose={() => confirmRevoke(id, permission)}
              >
                {permission}
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
              <Chip
                size="sm"
                variant="flat"
                color={
                  userData.plan === "free"
                    ? "default"
                    : userData.plan === "solo_plus"
                      ? "secondary"
                      : "primary"
                }
                className="mt-1"
              >
                {userData.plan}
              </Chip>
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

      {/* Confirm Revoke Modal */}
      <Modal
        isOpen={confirmModal.isOpen}
        onOpenChange={confirmModal.onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Confirm Revoke</ModalHeader>
              <ModalBody className="flex flex-row">
                <p>
                  Are you sure you want to revoke{" "}
                  <span className="font-semibold text-red-500">
                    {pendingDelete?.permission}
                  </span>{" "}
                  permission?
                </p>
              </ModalBody>
              <ModalFooter>
                <Button variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button className="bg-red-500" onPress={handleRevoke}>
                  Revoke
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
