"use client";

import React, { useEffect, useState } from "react";
import Sortable from "sortablejs";
import Sidebar from "@/components/KanbanBoard/Sidebar";
import Header from "@/components/KanbanBoard/Header";
import Column from "@/components/KanbanBoard/Column";
import Card from "@/components/KanbanBoard/Card";

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

const dummyCards: Record<ColumnKey, CardType[]> = {
  new: [
    {
      title: "Create login endpoint",
      assignee: "Alice",
      effort: 3,
      issueUrl: "https://example.com/issues/101",
      progress: 40,
      color: "blue",
      status: "inProgress",
      priority: "high",
    },
    {
      title: "Design onboarding flow",
      assignee: "Victor",
      effort: 2,
      issueUrl: "https://example.com/issues/105",
      progress: 10,
      color: "yellow",
      status: "review",
      priority: "medium",
    },
  ],
  active: [
    {
      title: "Fix header bug",
      assignee: "Bob",
      effort: 2,
      issueUrl: "https://example.com/issues/102",
      progress: 75,
      color: "green",
      status: "blocked",
      priority: "critical",
    },
    {
      title: "Implement dark mode",
      assignee: "Diana",
      effort: 3,
      issueUrl: "https://example.com/issues/106",
      progress: 50,
      color: "indigo",
      status: "review",
      priority: "medium",
    },
  ],
  staging: [
    {
      title: "Prepare release",
      assignee: "Charlie",
      effort: 1,
      issueUrl: "https://example.com/issues/103",
      progress: 100,
      color: "yellow",
      status: "done",
      priority: "high",
    },
    {
      title: "Fix mobile layout",
      assignee: "Eva",
      effort: 2,
      issueUrl: "https://example.com/issues/107",
      progress: 100,
      color: "blue",
      status: "done",
      priority: "low",
    },
  ],
  deployed: [
    {
      title: "Deploy initial version",
      assignee: "Team",
      effort: 5,
      issueUrl: "https://example.com/issues/104",
      progress: 100,
      color: "indigo",
      status: "done",
      priority: "medium",
    },
    {
      title: "Monitor analytics",
      assignee: "Frank",
      effort: 2,
      issueUrl: "https://example.com/issues/108",
      progress: 100,
      color: "green",
      status: "done",
      priority: "low",
    },
  ],
};

type BoardView = "kanban" | "list" | "gantt";

export default function MainBoard() {
  const [view, setView] = useState<BoardView>("kanban");

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
    // Optionally, clean up Sortable instances if switching away from Kanban
  }, [view]);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header with View Switcher */}
        <Header view={view} onViewChange={setView} />

        {/* Board Views */}
        {view === "kanban" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-8 overflow-auto transition-all duration-300">
            {columns.map((col) => (
              <Column
                key={col.id}
                id={col.id}
                title={col.title}
                countLabel={col.countLabel}
                countColor={col.countColor}
              >
                {dummyCards[col.id].map((card, i) => (
                  <Card key={i} {...card} />
                ))}
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
  );
}
