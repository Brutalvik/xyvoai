"use client";

import React, { ReactNode, useEffect, useState } from "react";
import ProjectHeader from "@/components/Overview/ProjectHeader";
import { KanbanBoard } from "@/components/Overview/Kanban";
import { TableView } from "@/components/Overview/TableView";
import GanttView from "@/components/Overview/GanttView";
import CreateTask from "@/components/CreateTask";
import { initialColumns } from "@/components/Overview/Dummy/data";
import { Column } from "@/components/Overview/Kanban/types";
import { ViewMode } from "react-modern-gantt";
import { useAppSelector } from "@/store/hooks";
import { selectUser } from "@/store/selectors";
import { useRouter, useSearchParams } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

export type BoardViewType = "kanban" | "table" | "gantt" | "createTask";

interface BoardLayoutProps {
  children?: ReactNode;
}

export function BoardLayout({ children }: BoardLayoutProps) {
  const activeUser: any = useAppSelector(selectUser);
  const user = activeUser?.user;

  const router = useRouter();
  const searchParams = useSearchParams();

  // Extract view from URL query
  const initialView = (searchParams.get("view") as BoardViewType) || "kanban";
  const [view, setView] = useState<BoardViewType>(initialView);
  const [columns, setColumns] = useState<Column[]>(initialColumns);

  // Sync view with URL
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("view", view);
    router.replace(`?${params.toString()}`, { scroll: false });
  }, [view]);

  const handleCreateNewTask = () => {
    const newTaskId = uuidv4();
    router.push(`/tasks/${newTaskId}?view=createTask`);
    setView("createTask");
  };

  return (
    <div className="flex flex-col h-screen w-full">
      {/* HEADER */}
      <div className="sticky top-[56px] z-20 bg-white border-b border-gray-200 dark:bg-neutral-900 dark:border-neutral-700 flex items-center justify-between px-4 py-2">
        <ProjectHeader viewMode={view} setViewMode={setView} />
        {view === "kanban" && (
          <button
            onClick={handleCreateNewTask}
            className="ml-4 px-3 py-1 bg-blue-500 text-white rounded"
          >
            Create New Task
          </button>
        )}
      </div>

      <div className="border-t border-gray-200 dark:border-neutral-700" />

      {/* VIEW RENDERER */}
      <div className="flex-grow overflow-auto">
        {view === "kanban" && (
          <KanbanBoard
            columns={columns}
            onTaskMove={() => {}}
            onTaskEdit={() => {}}
            onTaskDelete={() => {}}
            onColumnAdd={() => {}}
            onColumnEdit={() => {}}
            onColumnDelete={() => {}}
          />
        )}

        {view === "table" && (
          <TableView columns={columns} availableUsers={[]} availableTags={[]} />
        )}

        {view === "gantt" && (
          <GanttView
            columns={columns}
            onTaskUpdate={() => {}}
            viewMode={ViewMode.DAY}
          />
        )}

        {view === "createTask" && user && <CreateTask currentUser={user} />}
      </div>
    </div>
  );
}

export default BoardLayout;
