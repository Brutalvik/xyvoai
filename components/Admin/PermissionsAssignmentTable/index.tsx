"use client";

import { useEffect, useState } from "react";
import {
  Select,
  SelectItem,
  Input,
  Button,
  Chip,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  user,
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

export default function PermissionAssignmentTable({
  systemPermissions,
}: PermissionsProps) {
  const dispatch = useAppDispatch();
  const currentUserId = useAppSelector(selectUserId);
  const [resourceType, setResourceType] = useState<ResourceType>("user");
  const [resourceId, setResourceId] = useState("");
  const [selectedPermission, setSelectedPermission] = useState<string>("");
  const [assignedPermissions, setAssignedPermissions] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [userData, setUserData] = useState<any>(null);
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
        setAssignedPermissions(
          res.payload?.map((p: { permission: string }) => p.permission) || []
        );
        setUserData(res.payload?.[0]?.user || null);
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

  const noPermissions = assignedPermissions.length === 0;

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold tracking-tight flex items-center gap-2">
          <span role="img" aria-label="lock">
            🔒
          </span>{" "}
          Manage User Permissions
        </h2>
        <Button variant="ghost" size="sm" onPress={onOpen}>
          Show Permission Details
        </Button>
      </div>

      {/* Assign Form */}
      <div className="bg-content2/30 border border-content3 rounded-xl p-6 space-y-6 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
          <Select
            label="Resource Type"
            selectedKeys={new Set<string>([resourceType])}
            onSelectionChange={(keys) => {
              const value = Array.from(keys as Set<string>)[0] as ResourceType;
              setResourceType(value);
            }}
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
            label="Assign Permission"
            items={systemPermissions}
            selectedKeys={[selectedPermission]}
            onSelectionChange={(keys) => {
              const value = Array.from(keys as Set<string>)[0];
              setSelectedPermission(value);
            }}
          >
            {(permission) => (
              <SelectItem key={permission.key}>{permission.label}</SelectItem>
            )}
          </Select>

          <Button
            color="primary"
            size="lg"
            variant="shadow"
            onPress={handleAssign}
            isDisabled={!resourceId || !selectedPermission}
          >
            Assign
          </Button>
        </div>
      </div>

      {/* Assigned Permissions */}
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Assigned Permissions</h3>
        {noPermissions ? (
          <p className="text-danger text-sm italic">No permissions assigned.</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {assignedPermissions.map((perm, index) => (
              <Chip
                key={index}
                size="md"
                variant="faded"
                color="primary"
                onClose={() => handleRevoke(perm)}
                className="text-xs font-medium uppercase tracking-tight"
              >
                {perm}
              </Chip>
            ))}
          </div>
        )}
      </div>

      {/* User Info */}
      {userData && (
        <div className="rounded-xl border border-content3 bg-content2/40 p-6 shadow-sm max-w-4xl">
          <h3 className="text-lg font-semibold mb-4">User Profile</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="font-medium text-foreground-500">Name:</span>{" "}
              {userData.name || "-"}
            </div>
            <div>
              <span className="font-medium text-foreground-500">Email:</span>{" "}
              {userData.email || "-"}
            </div>
            <div>
              <span className="font-medium text-foreground-500">Phone:</span>{" "}
              {userData.phone || "-"}
            </div>
            <div>
              <span className="font-medium text-foreground-500">Role:</span>{" "}
              {userData.role || "-"}
            </div>
            <div>
              <span className="font-medium text-foreground-500">Plan:</span>{" "}
              {userData.plan || "-"}
            </div>
            <div>
              <span className="font-medium text-foreground-500">Org ID:</span>{" "}
              {userData.organization_id || "-"}
            </div>
          </div>
        </div>
      )}

      {/* Permissions Modal */}
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        scrollBehavior="inside"
        backdrop="opaque"
        classNames={{
          backdrop: "bg-black/70",
        }}
      >
        <ModalContent className="max-w-screen-xl w-full">
          {(onClose) => (
            <>
              <ModalHeader className="text-xl font-semibold">
                All System Permissions
              </ModalHeader>
              <ModalBody>
                <Input
                  placeholder="Search permissions..."
                  size="sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="mb-4"
                />
                <Table
                  isStriped
                  aria-label="System Permissions Table"
                  removeWrapper
                >
                  <TableHeader>
                    {["label", "key", "description", "category"].map((key) => (
                      <TableColumn key={key}>
                        <button
                          onClick={() =>
                            handleSort(key as keyof SystemPermission)
                          }
                          className="flex items-center gap-1 text-sm font-medium w-full justify-start"
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
                <Button color="danger" variant="flat" onPress={onClose}>
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
