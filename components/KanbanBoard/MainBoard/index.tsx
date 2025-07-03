"use client";

import React, { useEffect } from "react";
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
    countLabel: "1/5",
    countColor: "text-orange-600",
  },
  {
    id: "deployed",
    title: "deployed",
    countLabel: "1/3",
    countColor: "text-gray-600",
  },
];

type CardType = {
  title: string;
  assignee: string;
  storyPoints: number;
  issueUrl: string;
  progress: number;
  color: "blue" | "green" | "yellow" | "indigo";
};

const dummyCards: Record<ColumnKey, CardType[]> = {
  new: [
    {
      title: "Create login endpoint",
      assignee: "Alice",
      storyPoints: 3,
      issueUrl: "https://example.com/issues/101",
      progress: 40,
      color: "blue",
    },
  ],
  active: [
    {
      title: "Fix header bug",
      assignee: "Bob",
      storyPoints: 2,
      issueUrl: "https://example.com/issues/102",
      progress: 75,
      color: "green",
    },
  ],
  staging: [
    {
      title: "Prepare release",
      assignee: "Charlie",
      storyPoints: 1,
      issueUrl: "https://example.com/issues/103",
      progress: 100,
      color: "yellow",
    },
  ],
  deployed: [
    {
      title: "Deploy initial version",
      assignee: "Team",
      storyPoints: 5,
      issueUrl: "https://example.com/issues/104",
      progress: 100,
      color: "indigo",
    },
  ],
};

export default function MainBoard() {
  useEffect(() => {
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
  }, []);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header />

        {/* Kanban Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-6 overflow-auto">
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
      </main>
    </div>
  );
}
