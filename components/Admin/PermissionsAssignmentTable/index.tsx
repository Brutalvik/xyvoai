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
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-5">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <span role="img" aria-label="lock">
            🔒
          </span>{" "}
          Manage User Permissions
        </h2>
        <Button size="sm" variant="ghost" onPress={onOpen}>
          Show Permission Details
        </Button>
      </div>

      <div className="space-y-10 rounded-xl p-4">
        <div className="flex flex-wrap gap-4 items-end">
          <Select
            label="Resource Type"
            size="sm"
            selectedKeys={new Set<string>([resourceType])}
            onSelectionChange={(keys) => {
              const value = Array.from(keys as Set<string>)[0] as ResourceType;
              setResourceType(value);
            }}
            className="w-52"
          >
            {resourceTypes.map((type) => (
              <SelectItem key={type}>{type}</SelectItem>
            ))}
          </Select>

          <Input
            label="Resource ID"
            size="sm"
            value={resourceId}
            onChange={(e) => setResourceId(e.target.value)}
            className="w-52"
          />

          <Select
            className="w-52"
            items={systemPermissions}
            label="Assign Permission"
            size="sm"
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
            variant="shadow"
            size="lg"
            onPress={handleAssign}
            isDisabled={!resourceId || !selectedPermission}
            className="w-52"
          >
            Assign
          </Button>
        </div>

        <div className="flex flex-row gap-2">
          <h3 className="text-sm font-medium mb-2">Assigned Permissions :</h3>
          {noPermissions ? (
            <p className="text-red-500 text-sm">No Permissions Attached</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {assignedPermissions.map((perm, index) => (
                <Chip
                  key={index}
                  size="md"
                  variant="flat"
                  onClose={() => handleRevoke(perm)}
                  className="hover:cursor-pointer"
                >
                  {perm}
                </Chip>
              ))}
            </div>
          )}
        </div>
        {userData && (
          <Table removeWrapper aria-label="Full User Info" isStriped>
            <TableHeader>
              <TableColumn>Name</TableColumn>
              <TableColumn>Email</TableColumn>
              <TableColumn>Phone</TableColumn>
              <TableColumn>Role</TableColumn>
              <TableColumn>Plan</TableColumn>
              <TableColumn>Org ID</TableColumn>
            </TableHeader>
            <TableBody>
              <TableRow key={userData.id}>
                <TableCell>{userData.name || "-"}</TableCell>
                <TableCell>{userData.email || "-"}</TableCell>
                <TableCell>{userData.phone || "-"}</TableCell>
                <TableCell>{userData.role || "-"}</TableCell>
                <TableCell>{userData.plan || "-"}</TableCell>
                <TableCell>{userData.organization_id || "-"}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        )}
      </div>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        scrollBehavior="inside"
        backdrop="opaque"
        classNames={{
          backdrop:
            "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
        }}
      >
        <ModalContent className="max-w-screen-xl w-full">
          {(onClose) => (
            <>
              <ModalHeader className="text-lg font-semibold">
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
