"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import GetStarted from "@/components/Dashboard/GetStarted";
import ProjectsList from "@/components/Dashboard/ProjectList";
import {
  Select,
  SelectItem,
  Switch,
  Input,
  Button,
  Tooltip,
} from "@heroui/react";
import { demoProjects } from "@/data/dummyProjects";

const ProjectsPage = () => {
  const router = useRouter();

  const user = {
    plan: "free", // or 'pro' | 'team'
    projects: demoProjects, // list of user's projects
  };

  const plan = user.plan as "free" | "pro" | "team";
  const currentProjectCount = user.projects.length;

  const [showAIModeOnly, setShowAIModeOnly] = useState(false);
  const [statusFilter, setStatusFilter] = useState("");
  const [visibilityFilter, setVisibilityFilter] = useState("");

  const handleCreateProject = () => {
    router.push("/dashboard/individual/create-project");
  };

  return (
    <>
      {currentProjectCount === 0 ? (
        <GetStarted
          onCreateProject={handleCreateProject}
          plan={plan}
          currentProjectCount={currentProjectCount}
        />
      ) : (
        <div className="p-4 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4">
              <Select
                label="Status"
                size="sm"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-48"
              >
                <SelectItem key="">All</SelectItem>
                <SelectItem key="In Progress">In Progress</SelectItem>
                <SelectItem key="Not Started">Not Started</SelectItem>
                <SelectItem key="Blocked">Blocked</SelectItem>
                <SelectItem key="Completed">Completed</SelectItem>
                <SelectItem key="Cancelled">Cancelled</SelectItem>
              </Select>

              <Select
                label="Visibility"
                size="sm"
                value={visibilityFilter}
                onChange={(e) => setVisibilityFilter(e.target.value)}
                className="w-48"
              >
                <SelectItem key="">All</SelectItem>
                <SelectItem key="Public">Public</SelectItem>
                <SelectItem key="Private">Private</SelectItem>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <div>
                <Tooltip content="Create new project">
                  <Button
                    variant="flat"
                    color="primary"
                    onPress={handleCreateProject}
                  >
                    + Project
                  </Button>
                </Tooltip>
              </div>
              <div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  AI-Managed:
                </span>
                <Switch
                  size="sm"
                  isSelected={showAIModeOnly}
                  onChange={(e) => setShowAIModeOnly(e.target.checked)}
                />
              </div>
            </div>
          </div>

          <ProjectsList
            showAIOnly={showAIModeOnly}
            statusFilter={statusFilter}
            visibilityFilter={visibilityFilter}
            projects={user.projects}
          />
        </div>
      )}
    </>
  );
};

export default ProjectsPage;
