"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchProjects } from "@/store/slices/projectsSlice";
import GetStarted from "@/components/Dashboard/GetStarted";
import ProjectsList from "@/components/Dashboard/ProjectList";
import ProjectOverview from "@/components/Dashboard/ProjectOverview";
import { Select, SelectItem, Switch, Button, Tooltip } from "@heroui/react";
import { Project } from "@/types";
import XLoader from "@/components/ui/XLoader";
import { useTranslations } from "next-intl";

const ProjectsPage = () => {
  const t = useTranslations("ProjectList");
  const router = useRouter();
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const projectId = searchParams.get("projectId");
  const { items: projects, loading } = useAppSelector((s) => s.projects);

  const [showAIModeOnly, setShowAIModeOnly] = useState(false);
  const [statusFilter, setStatusFilter] = useState("");
  const [visibilityFilter, setVisibilityFilter] = useState("");

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  const filteredProjects = useMemo(() => {
    return (projects ?? []).filter((project: Project) => {
      const matchesStatus =
        !statusFilter ||
        project.status.toLowerCase() === statusFilter.toLowerCase();
      const matchesVisibility =
        !visibilityFilter ||
        project.visibility.toLowerCase() === visibilityFilter.toLowerCase();
      const matchesAI = !showAIModeOnly || project.ai_tasks === true;
      return matchesStatus && matchesVisibility && matchesAI;
    });
  }, [projects, statusFilter, visibilityFilter, showAIModeOnly]);

  const handleCreateProject = () => {
    router.push("/dashboard/projects/create");
  };

  const handleBackToProjects = () => {
    router.push("/dashboard/projects");
  };

  if (projectId) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button
            variant="light"
            color="primary"
            onPress={handleBackToProjects}
          >
            ← {t("projectListBack")}
          </Button>
        </div>
        <ProjectOverview projectId={projectId} />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-gray-500 dark:text-gray-400">
        <XLoader />
        <p className="mt-4 text-sm font-medium">{t("loadingProjects")}</p>
      </div>
    );
  }

  if (!loading && projects.length === 0) {
    return (
      <GetStarted
        onCreateProject={handleCreateProject}
        plan="free"
        currentProjectCount={0}
      />
    );
  }

  return (
    <div className="p-4 space-y-4">
      {/* Filters and Create Button */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-4">
          <Select
            label={t("status")}
            size="sm"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-48"
          >
            <SelectItem key="">{t("all")}</SelectItem>
            <SelectItem key="active">{t("active")}</SelectItem>
            <SelectItem key="completed">{t("completed")}</SelectItem>
            <SelectItem key="archived">{t("archived")}</SelectItem>
          </Select>

          <Select
            label={t("visibility")}
            size="sm"
            value={visibilityFilter}
            onChange={(e) => setVisibilityFilter(e.target.value)}
            className="w-48"
          >
            <SelectItem key="">{t("all")}</SelectItem>
            <SelectItem key="private">{t("private")}</SelectItem>
            <SelectItem key="public">{t("public")}</SelectItem>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <Tooltip content={t("createTooltip")}>
            {/* Create new project */}
            <Button
              variant="flat"
              color="primary"
              onPress={handleCreateProject}
            >
              + {t("createButton")}
            </Button>
          </Tooltip>
          <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
            {t("aiManaged")}
            <Switch
              size="sm"
              isSelected={showAIModeOnly}
              onChange={(e) => setShowAIModeOnly(e.target.checked)}
            />
          </div>
        </div>
      </div>

      {/* Project List */}
      <ProjectsList
        projects={filteredProjects}
        showAIOnly={showAIModeOnly}
        statusFilter={statusFilter}
        visibilityFilter={visibilityFilter}
      />
    </div>
  );
};

export default ProjectsPage;
