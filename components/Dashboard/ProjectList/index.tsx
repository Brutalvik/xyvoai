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

const dummyProjects = [
  {
    id: "1",
    name: "AI Assistant Redesign",
    color: "#4f46e5",
    tags: ["🧠 ai", "🖼 frontend"],
    startDate: "2025-07-01",
    dueDate: "2025-08-15",
    visibility: "Private",
    aiTasks: true,
    projectType: "Internal",
    priority: "High",
    status: "In Progress",
    completion: 45,
    team: [
      { name: "Roger", src: "https://bit.ly/4erJlQT" },
      { name: "Steven", src: "" },
      { name: "Nathan", src: "http://bit.ly/3TcQU46" },
      { name: "Lori", src: "https://bit.ly/4lxG30J" },
    ],
    nextAction: "Review new UI mockups",
  },
  {
    id: "2",
    name: "Client Portal Launch",
    color: "#10b981",
    tags: ["💼 client", "🚀 launch"],
    startDate: "2025-06-15",
    dueDate: "2025-07-30",
    visibility: "Public",
    aiTasks: false,
    projectType: "Client",
    priority: "Urgent",
    status: "Completed",
    completion: 100,
    team: [
      { name: "Sara", src: "" },
      { name: "Leo", src: "http://bit.ly/44rfJ1t" },
      { name: "Gabriel", src: "" },
      { name: "Frank", src: "http://bit.ly/4l5RWLr" },
      { name: "Nathan", src: "http://bit.ly/3TcQU46" },
    ],
    nextAction: "Send final report to client",
  },
];

function getRandomColor(name: string) {
  const colors = [
    "#1abc9c",
    "#2ecc71",
    "#3498db",
    "#9b59b6",
    "#f39c12",
    "#e67e22",
    "#e74c3c",
  ];
  const index = name.charCodeAt(0) % colors.length;
  return colors[index];
}

export default function ProjectsList() {
  const t = useTranslations("ProjectList");

  if (dummyProjects.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500 dark:text-gray-400">
        {t("empty")}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {dummyProjects.map((project) => (
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
                      : "warning"
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
