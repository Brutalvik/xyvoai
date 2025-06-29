"use client";

import { Badge } from "@heroui/badge";
import { Button } from "@heroui/button";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { Tooltip } from "@heroui/tooltip";
import { useTranslations } from "next-intl";
import { format } from "date-fns";
import { HiEye, HiTrash } from "react-icons/hi";
import { Chip, Avatar, AvatarGroup } from "@heroui/react";
import { Progress } from "@heroui/progress";
import { getBgColor, getInitial } from "@/utils";
import { ProjectsListProps } from "@/types";

export default function ProjectsList({
  showAIOnly,
  statusFilter,
  visibilityFilter,
  projects,
}: ProjectsListProps) {
  const t = useTranslations("ProjectList");

  if (!projects || projects.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500 dark:text-gray-400">
        {t("empty")}
      </div>
    );
  }

  const filteredProjects = projects.filter((project) => {
    const matchesAI = !showAIOnly || project.aiTasks;
    const matchesStatus =
      statusFilter === "" || project.status === statusFilter;
    const matchesVisibility =
      visibilityFilter === "" || project.visibility === visibilityFilter;
    return matchesAI && matchesStatus && matchesVisibility;
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {filteredProjects.map((project) => (
        <Card
          key={project.id}
          className="relative border-l-4"
          style={{ borderColor: project.color }}
        >
          <CardHeader>
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: project.color }}
                />
                {project.aiTasks ? (
                  <div className="flex flex-col">
                    <Tooltip content={t("managedByAI")}>
                      <Badge
                        color="primary"
                        content="AI"
                        size="sm"
                        className="hover:cursor-pointer"
                      >
                        <h2 className="text-lg font-semibold">
                          {project.name}
                        </h2>
                      </Badge>
                    </Tooltip>
                    <h4 className="text-sm">{`${t("projectId")}: ${project.id}`}</h4>
                  </div>
                ) : (
                  <h2 className="text-lg font-semibold">{project.name}</h2>
                )}
              </div>
              <div className="flex flex-wrap gap-4">
                {project.tags && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {project.tags.map((tag: string) => (
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
            </div>
          </CardHeader>
          <CardBody className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
            <div className="flex items-center justify-between">
              <strong>{t("status")}:</strong>
              <Chip
                size="sm"
                color={
                  project.status === "Completed"
                    ? "success"
                    : project.status === "In Progress"
                      ? "primary"
                      : project.status === "Blocked"
                        ? "danger"
                        : "default"
                }
              >
                {project.status}
              </Chip>
            </div>
            <Progress
              value={project.completion}
              className="my-2 h-2 rounded-full"
              color={project.completion === 100 ? "success" : "primary"}
            />
            <div>
              <strong>{t("startDate")}: </strong>
              {format(new Date(project.startDate), "PPP")}
            </div>
            <div>
              <strong>{t("dueDate")}: </strong>
              {format(new Date(project.dueDate), "PPP")}
            </div>
            <div>
              <strong>{t("type")}: </strong>
              {project.projectType}
            </div>
            <div className="flex items-center gap-1">
              <strong>{t("priority")}: </strong>
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
                className="hover:cursor-pointer"
              >
                {project.priority}
              </Chip>
            </div>
            <div>
              <strong>{t("visibility")}: </strong>
              {project.visibility}
            </div>
            <div>
              <strong>{t("team")}: </strong>
              <AvatarGroup className="mt-1" max={5} size="sm">
                {project.team.map((member) => (
                  <Tooltip content={member.name}>
                    <Avatar
                      key={member.name}
                      src={member.src || undefined}
                      alt={member.name}
                      name={getInitial(member.name)}
                      size="sm"
                      style={
                        !member.src || member.src === ""
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
            <div>
              <strong>{t("nextAction")}: </strong>
              {project.nextAction}
            </div>
          </CardBody>
          <CardFooter className="flex justify-end gap-2">
            <Tooltip content={t("view")}>
              <Button variant="light" size="sm">
                <HiEye className="w-4 h-4" />
              </Button>
            </Tooltip>
            <Tooltip content={t("delete")}>
              <Button variant="flat" color="danger" size="sm">
                <HiTrash className="w-4 h-4" />
              </Button>
            </Tooltip>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
