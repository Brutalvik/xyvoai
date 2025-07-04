"use client";

import {
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Tooltip,
  Chip,
  Avatar,
  AvatarGroup,
  Progress,
} from "@heroui/react";
import { useTranslations } from "next-intl";
import { format } from "date-fns";
import { HiEye, HiTrash, HiPencil } from "react-icons/hi";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store/hooks";
import { deleteProject } from "@/store/slices/projectsSlice";
import { getBgColor, getInitial } from "@/utils";
import { ProjectsListProps } from "@/types";

export default function ProjectsList({
  showAIOnly,
  statusFilter,
  visibilityFilter,
  projects,
}: ProjectsListProps) {
  const t = useTranslations("ProjectList");
  const router = useRouter();
  const dispatch = useAppDispatch();

  const filteredProjects = (projects ?? []).filter((project) => {
    const matchesAI = !showAIOnly || project.ai_tasks === true;
    const matchesStatus =
      statusFilter === "" || project.status === statusFilter;
    const matchesVisibility =
      visibilityFilter === "" || project.visibility === visibilityFilter;
    return matchesAI && matchesStatus && matchesVisibility;
  });

  if (filteredProjects.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500 dark:text-gray-400">
        {t("empty")}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {filteredProjects.map((project) => (
        <Card
          key={project.id}
          className="relative border-l-4 shadow-lg rounded-2xl dark:bg-gray-900 bg-white hover:shadow-xl transition-shadow duration-300"
          style={{ borderColor: project.color }}
        >
          <CardHeader className="pb-0">
            <div className="flex items-start justify-between gap-4">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full mt-1"
                    style={{ backgroundColor: project.color }}
                  />
                  {project.ai_tasks ? (
                    <Tooltip content={t("managedByAI")}>
                      <Badge
                        color="primary"
                        content="AI"
                        size="sm"
                        className="hover:cursor-pointer"
                      >
                        <h2 className="text-lg font-bold text-gray-800 dark:text-white">
                          {project.name}
                        </h2>
                      </Badge>
                    </Tooltip>
                  ) : (
                    <h2 className="text-lg font-bold text-gray-800 dark:text-white">
                      {project.name}
                    </h2>
                  )}
                </div>
                <span className="text-xs text-gray-400">
                  {t("projectId")}: {project.id.slice(0, 8)}
                </span>
              </div>
              {project.tags && project.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 max-w-[50%] justify-end">
                  {project.tags.map((tag) => (
                    <Chip
                      key={tag.trim()}
                      size="sm"
                      variant="flat"
                      color="primary"
                      className="hover:cursor-pointer"
                    >
                      {tag.trim()}
                    </Chip>
                  ))}
                </div>
              )}
            </div>
          </CardHeader>

          <CardBody className="text-sm text-gray-600 dark:text-gray-300 space-y-2 py-2">
            <div className="flex items-center justify-between">
              <strong>{t("status")}</strong>
              <Chip
                size="sm"
                color={
                  project.status === "completed"
                    ? "success"
                    : project.status === "active"
                      ? "primary"
                      : "default"
                }
              >
                {project.status}
              </Chip>
            </div>

            {typeof project.completion === "number" && (
              <div className="pt-1">
                <Progress
                  value={project.completion}
                  className="h-2 rounded-full"
                  color={project.completion === 100 ? "success" : "primary"}
                />
              </div>
            )}

            <div>
              <strong>{t("startDate")}</strong>:{" "}
              {project.start_date
                ? format(new Date(project.start_date), "PPP")
                : t("na")}
            </div>
            <div>
              <strong>{t("dueDate")}</strong>:{" "}
              {project.end_date
                ? format(new Date(project.end_date), "PPP")
                : t("na")}
            </div>

            {project.projectType && (
              <div>
                <strong>{t("type")}</strong>: {project.projectType}
              </div>
            )}

            {project.priority && (
              <div className="flex items-center gap-1">
                <strong>{t("priority")}</strong>:
                <Chip
                  size="sm"
                  color={
                    project.priority === "Urgent"
                      ? "danger"
                      : project.priority === "High"
                        ? "warning"
                        : project.priority === "Medium"
                          ? "primary"
                          : "default"
                  }
                >
                  {project.priority}
                </Chip>
              </div>
            )}

            <div>
              <strong>{t("visibility")}</strong>: {project.visibility}
            </div>

            {project.team && project.team.length > 0 && (
              <div>
                <strong>{t("team")}</strong>:
                <AvatarGroup className="mt-1" max={5} size="sm">
                  {project.team.map((member) => (
                    <Tooltip key={member.name} content={member.name}>
                      <Avatar
                        src={member.src || undefined}
                        alt={member.name}
                        name={getInitial(member.name)}
                        size="sm"
                        style={
                          !member.src
                            ? {
                                backgroundColor: getBgColor(member.name, true),
                                color: "text-default-700",
                                fontWeight: "bold",
                              }
                            : {}
                        }
                        className="hover:cursor-pointer"
                      />
                    </Tooltip>
                  ))}
                </AvatarGroup>
              </div>
            )}

            {project.nextAction && (
              <div>
                <strong>{t("nextAction")}</strong>: {project.nextAction}
              </div>
            )}
          </CardBody>

          <CardFooter className="flex justify-end gap-2 pt-2">
            <Tooltip content={t("view")}>
              <Button variant="light" size="sm">
                <HiEye className="w-4 h-4" />
              </Button>
            </Tooltip>
            <Tooltip content={t("edit")}>
              <Button
                variant="flat"
                color="secondary"
                size="sm"
                onPress={() =>
                  router.push(
                    `/dashboard/projects/create?projectId=${project.id}`
                  )
                }
              >
                <HiPencil className="w-4 h-4" />
              </Button>
            </Tooltip>
            <Tooltip content={t("delete")}>
              <Button
                variant="flat"
                color="danger"
                size="sm"
                onPress={() => dispatch(deleteProject(project.id))}
              >
                <HiTrash className="w-4 h-4" />
              </Button>
            </Tooltip>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
