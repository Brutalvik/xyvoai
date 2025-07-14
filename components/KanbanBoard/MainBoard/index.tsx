"use client";

import React, { useEffect, useState } from "react";
import Sortable from "sortablejs";

import EmptyProjects from "./EmptyProjects";

import { useAppSelector, useAppDispatch } from "@/store/hooks";
import {
  selectProjects,
  isProjectsLoading,
} from "@/store/selectors/projectSelector";
import { fetchProjects } from "@/store/slices/projectsSlice";
import { fetchTasks } from "@/store/slices/tasksSlice";
import {
  selectTasksByProject,
  selectTasksLoading,
  selectTasksError,
} from "@/store/selectors/taskSelector";
import Sidebar from "@/components/KanbanBoard/Sidebar";
import Header from "@/components/KanbanBoard/Header";
import Column from "@/components/KanbanBoard/Column";
import Card from "@/components/KanbanBoard/Card";
import NavigationBreadcrumbs from "@/components/KanbanBoard/NavigationBreadcrumbs";

type ColumnKey = "new" | "active" | "staging" | "deployed";

const columns: {
  id: ColumnKey;
  title: string;
  countLabel: string;
  countColor: string;
}[] = [
  { id: "new", title: "new", countLabel: "2/5", countColor: "text-gray-500" },
  {
    id: "active",
    title: "active",
    countLabel: "2/5",
    countColor: "text-green-600",
  },
  {
    id: "staging",
    title: "staging",
    countLabel: "2/5",
    countColor: "text-orange-600",
  },
  {
    id: "deployed",
    title: "deployed",
    countLabel: "2/3",
    countColor: "text-gray-600",
  },
];

type CardType = {
  title: string;
  assignee: string;
  effort: number;
  issueUrl: string;
  progress: number;
  color: "blue" | "green" | "yellow" | "indigo";
  status: "inProgress" | "blocked" | "done" | "review";
  priority: "low" | "medium" | "high" | "critical";
};

type BoardView = "kanban" | "list" | "gantt";

export default function MainBoard() {
  const dispatch = useAppDispatch();
  const projects = useAppSelector(selectProjects);
  const loading = useAppSelector(isProjectsLoading);
  const [view, setView] = useState<BoardView>("kanban");

  // Filters and project selection state
  const [selectedProjectId, setSelectedProjectId] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState("");
  const [visibilityFilter, setVisibilityFilter] = useState("");
  const [showAIModeOnly, setShowAIModeOnly] = useState(false);

  // Set default selected project when projects load
  useEffect(() => {
    if (projects.length > 0 && !selectedProjectId) {
      setSelectedProjectId(projects[0].id);
    }
  }, [projects, selectedProjectId]);

  useEffect(() => {
    dispatch(fetchProjects());
  }, []);

  useEffect(() => {
    if (view === "kanban") {
      columns.forEach((col) => {
        const el = document.getElementById(col.id);

        if (el) {
          Sortable.create(el, {
            group: "kanban",
            animation: 150,
            ghostClass: "bg-yellow-100",
          });
        }
      });
    }
  }, [view]);

  const tasks = useAppSelector(selectTasksByProject(selectedProjectId));
  const tasksLoading = useAppSelector(selectTasksLoading);
  const tasksError = useAppSelector(selectTasksError);

  useEffect(() => {
    if (selectedProjectId) {
      dispatch(fetchTasks(selectedProjectId));
    }
  }, [dispatch, selectedProjectId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="text-lg text-gray-500">Loading projects...</span>
      </div>
    );
  }

  if (!projects || projects.length === 0) {
    return <EmptyProjects />;
  }

  // Find selected project
  const selectedProject =
    projects.find((p) => p.id === selectedProjectId) || projects[0];

  // Apply filters to tasks
  const filteredTasks = tasks.filter(
    (task) =>
      (!statusFilter || task.status === statusFilter) &&
      (!visibilityFilter || task.visibility === visibilityFilter) &&
      (!showAIModeOnly || task.ai_tasks === true)
  );

  // Group tasks by column/status
  const tasksByColumn = columns.reduce(
    (acc, col) => {
      acc[col.id] = filteredTasks.filter((task) => task.status === col.id);

      return acc;
    },
    {} as Record<string, typeof filteredTasks>
  );

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar
          projects={projects}
          selectedProjectId={selectedProjectId}
          setSelectedProjectId={setSelectedProjectId}
        />
        {/* Main Content */}
        <main className="flex-1 flex flex-col overflow-hidden">
          {/* Filters Bar */}
          <div className="flex items-center gap-4 px-8 pt-4"></div>
          {/* Header with View Switcher */}
          <Header
  view={view}
  onViewChange={setView}
  selectedProjectId={selectedProjectId}
  setSelectedProjectId={setSelectedProjectId}
  projects={projects}
/>

          {/* Board Views */}
          {view === "kanban" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-8 overflow-auto transition-all duration-300">
              {columns.map((col) => (
                <Column
                  key={col.id}
                  countColor={col.countColor}
                  countLabel={`${tasksByColumn[col.id]?.length ?? 0}`}
                  id={col.id}
                  title={col.title}
                >
                  {tasksLoading ? (
                    <div className="text-gray-400 text-sm">Loading...</div>
                  ) : tasksError ? (
                    <div className="text-red-400 text-sm">{tasksError}</div>
                  ) : tasksByColumn[col.id]?.length ? (
                    tasksByColumn[col.id].map((card, idx) => (
                      <Card
                        key={card.id || card.title + idx}
                        assignee={card.assignee || "Unassigned"}
                        effort={card.effort ?? 0}
                        issueUrl={card.issueUrl || ""}
                        priority={card.priority || "medium"}
                        progress={card.progress ?? 0}
                        status={card.status as any}
                        title={card.title}
                      />
                    ))
                  ) : (
                    <div className="text-gray-300 text-sm text-center py-4">
                      No tasks
                    </div>
                  )}
                </Column>
              ))}
            </div>
          )}
          {view === "list" && (
            <div className="p-8">
              <div className="bg-white rounded-xl shadow p-8 flex flex-col items-center justify-center min-h-[400px] border border-gray-200">
                <span className="material-icons text-5xl text-blue-400 mb-4">
                  view_list
                </span>
                <h2 className="text-xl font-bold mb-2">
                  List View (Coming Soon)
                </h2>
                <p className="text-gray-500">
                  A professional, sortable list of all your tasks will appear
                  here.
                </p>
              </div>
            </div>
          )}
          {view === "gantt" && (
            <div className="p-8">
              <div className="bg-white rounded-xl shadow p-8 flex flex-col items-center justify-center min-h-[400px] border border-gray-200">
                <span className="material-icons text-5xl text-green-400 mb-4">
                  timeline
                </span>
                <h2 className="text-xl font-bold mb-2">
                  Gantt Chart View (Coming Soon)
                </h2>
                <p className="text-gray-500">
                  A modern Gantt chart for project planning will be available
                  here.
                </p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
