// components/PermissionAssignmentTable.tsx
"use client";

import { ChangeEvent, useState } from "react";
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
import { useTranslations } from "next-intl";
import { ChevronUp, ChevronDown, ChevronsUpDown } from "lucide-react";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  assignPermission,
  fetchUserPermissions,
  removePermission,
} from "@/store/slices/permissionsSlice";
import { SystemPermission } from "@/types";
import { selectUserId } from "@/store/selectors";
import { addDashes } from "@/components/Admin/PermissionsAssignmentTable/helper";

type ResourceType = "user" | "team" | "project";
const resourceTypes: ResourceType[] = ["user", "team", "project"];

interface PermissionsProps {
  systemPermissions: SystemPermission[];
}

export default function PermissionAssignmentTable({
  systemPermissions,
}: PermissionsProps) {
  const t = useTranslations("PermissionAssignment");
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
  const [isResourceFetched, setIsResourceFetched] = useState<boolean>(false);

  const [isFetchingUser, setIsFetchingUser] = useState(false);
  const [isAssigning, setIsAssigning] = useState(false);

  const getResourceTypeLabel = (type: ResourceType) => {
    switch (type) {
      case "user":
        return t("user");
      case "team":
        return t("team");
      case "project":
        return t("project");
      default:
        return type;
    }
  };

  const handleResourceIdChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^a-fA-F0-9]/g, ""); // keep hex chars only
    if (value.length === 32) {
      try {
        const dashed = addDashes(value);
        setResourceId(dashed);
      } catch {
        setResourceId(value);
      }
    } else {
      setResourceId(value);
    }
  };

  const handleFetchResource = () => {
    if (!resourceId) return;
    setIsFetchingUser(true);
    dispatch(fetchUserPermissions(resourceId))
      .then((res: any) => {
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
          setIsResourceFetched(true);
        } else {
          setUserData(null);
          setAssignedPermissions([]);
        }
      })
      .finally(() => setIsFetchingUser(false));
  };

  const handleAssign = () => {
    if (!selectedPermission || !resourceId) return;
    setIsAssigning(true);
    dispatch(
      assignPermission({
        user_id: resourceType === "user" ? resourceId : "",
        resource_type: resourceType,
        resource_id: resourceId,
        permission: selectedPermission,
        granted_by: currentUserId as string,
      })
    )
      .then(() => dispatch(fetchUserPermissions(resourceId)))
      .then((res: any) => {
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
        }
        addToast({
          title: t("permissionAssigned"),
          description: `'${selectedPermission}' ${t("permissionGranted")}`,
          color: "success",
          timeout: 3000,
        });
        setSelectedPermission("");
      })
      .finally(() => setIsAssigning(false));
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
            title: t("error"),
            description: `${t("failedToRevoke")} '${permission}'.`,
            color: "danger",
            timeout: 3000,
          });
        });
      }
    }, 3000);

    addToast({
      title: t("permissionRevoked"),
      description: `'${permission}' ${t("permissionRemoved")}`,
      color: "success",
      variant: "solid",
      endContent: (
        <div className="flex gap-2 mt-2">
          <Button
            color="primary"
            size="sm"
            variant="bordered"
            onPress={() => {
              undo = true;
              clearTimeout(timeout);
              setAssignedPermissions((prev) => [...prev, { id, permission }]);
            }}
          >
            {t("undo")}
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

  const handleClearUser = () => {
    setResourceId("");
    setUserData(null);
    setAssignedPermissions([]);
    setIsResourceFetched(false);
    setSelectedPermission("");
  };

  return (
    <div className="space-y-10 text-sm">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold tracking-tight">
          {t("userPermissions")}
        </h2>
        <Button size="sm" variant="ghost" onPress={onOpen}>
          {t("viewPermissionRegistry")}
        </Button>
      </div>

      {/* Assignment Form */}
      <div className="bg-background shadow-md border border-border rounded-2xl p-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Select
            label={t("resourceType")}
            selectedKeys={new Set([resourceType])}
            onSelectionChange={(keys) =>
              setResourceType(Array.from(keys)[0] as ResourceType)
            }
          >
            {resourceTypes.map((type) => (
              <SelectItem key={type}>{getResourceTypeLabel(type)}</SelectItem>
            ))}
          </Select>

          <Input
            label={t("resourceId")}
            value={resourceId}
            onChange={handleResourceIdChange}
          />

          {isResourceFetched ? (
            <>
              <Select
                items={systemPermissions.filter(
                  (perm) =>
                    !assignedPermissions.some((p) => p.permission === perm.key)
                )}
                label={t("permission")}
                selectedKeys={[selectedPermission]}
                onSelectionChange={(keys) =>
                  setSelectedPermission(String(Array.from(keys)[0]))
                }
              >
                {(perm) => <SelectItem key={perm.key}>{perm.label}</SelectItem>}
              </Select>
              <div className="flex gap-2">
                <Button
                  color="primary"
                  isDisabled={!resourceId || !selectedPermission}
                  isLoading={isAssigning}
                  size="lg"
                  variant="shadow"
                  onPress={handleAssign}
                >
                  {t("assign")}
                </Button>
                <Button
                  color="secondary"
                  size="lg" // added size prop
                  variant="flat"
                  onPress={handleClearUser}
                >
                  {t("clearUser")}
                </Button>
              </div>
            </>
          ) : (
            <Button
              color="primary"
              isDisabled={!resourceId}
              isLoading={isFetchingUser}
              size="lg"
              variant="shadow"
              onPress={handleFetchResource}
            >
              {t("getUser")}
            </Button>
          )}
        </div>
      </div>

      {/* Permission Chips */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">{t("assignedPermissions")}</h3>
        {assignedPermissions.length === 0 ? (
          <p className="text-foreground-400 italic">{t("noneAssigned")}</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {assignedPermissions.map(({ id, permission }, index) => (
              <Chip
                key={index}
                color="primary"
                size="md"
                variant="flat"
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
          <h3 className="text-lg font-semibold mb-4">{t("userProfile")}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <div className="text-xs font-semibold text-foreground-400">
                {t("name")}
              </div>
              <div>{userData.name}</div>
            </div>
            <div>
              <div className="text-xs font-semibold text-foreground-400">
                {t("email")}
              </div>
              <div>{userData.email}</div>
            </div>
            <div>
              <div className="text-xs font-semibold text-foreground-400">
                {t("phone")}
              </div>
              <div>{userData.phone}</div>
            </div>
            <div>
              <div className="text-xs font-semibold text-foreground-400">
                {t("role")}
              </div>
              <div>{userData.role}</div>
            </div>
          </div>
        </div>
      )}

      {/* Permission Modal */}
      <Modal
        isOpen={isOpen}
        scrollBehavior="inside"
        onOpenChange={onOpenChange}
      >
        <ModalContent className="max-w-6xl">
          {(onClose) => (
            <>
              <ModalHeader>{t("allSystemPermissions")}</ModalHeader>
              <ModalBody>
                <Input
                  className="mb-4"
                  placeholder={t("searchPermissions")}
                  size="sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Table isStriped removeWrapper>
                  <TableHeader>
                    {["label", "key", "description", "category"].map((key) => (
                      <TableColumn key={key}>
                        <button
                          className="flex items-center gap-1 text-sm font-semibold"
                          onClick={() =>
                            handleSort(key as keyof SystemPermission)
                          }
                        >
                          {t(
                            key as "label" | "key" | "description" | "category"
                          )}
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
                  {t("close")}
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
              <ModalHeader>{t("confirmRevoke")}</ModalHeader>
              <ModalBody className="flex flex-row">
                <p>
                  {t("confirmRevokeMessage")}{" "}
                  <span className="font-semibold text-red-500">
                    {pendingDelete?.permission}
                  </span>{" "}
                  {t("permissionText")}
                </p>
              </ModalBody>
              <ModalFooter>
                <Button variant="light" onPress={onClose}>
                  {t("cancel")}
                </Button>
                <Button className="bg-red-500" onPress={handleRevoke}>
                  {t("revoke")}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
