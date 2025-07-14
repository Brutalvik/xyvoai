"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import {
  Tooltip,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/react";

import { NavigationBreadcrumbs } from "@/components/KanbanBoard/NavigationBreadcrumbs";

type BoardView = "kanban" | "list" | "gantt";

import { useAppDispatch } from "@/store/hooks";
import { deleteProject } from "@/store/slices/projectsSlice";

interface HeaderProps {
  view: BoardView;
  onViewChange: (view: BoardView) => void;
  selectedProjectId: string;
  setSelectedProjectId: (id: string) => void;
  projects: { id: string; name: string }[];
}

const Header: React.FC<HeaderProps> = ({
  view,
  onViewChange,
  selectedProjectId,
  setSelectedProjectId,
  projects,
}) => {
  const t = useTranslations("Header");
  const [searchOpen, setSearchOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const dispatch = useAppDispatch();
  const projectName =
    projects.find((p) => p.id === selectedProjectId)?.name || "this project";

  const handleDeleteProject = async () => {
    setShowDeleteModal(false); // Close modal immediately
    await dispatch(deleteProject(selectedProjectId));
    // Wait for projects to update before setting selectedProjectId
    setTimeout(() => {
      const remaining = projects.filter((p) => p.id !== selectedProjectId);
      if (remaining.length > 0) setSelectedProjectId(remaining[0].id);
      // If no projects remain, do nothing; MainBoard will show EmptyProjects
    }, 100);
  };

  return (
    <header className="px-6 py-4 shadow-sm flex items-center justify-between border-b">
      <div className="flex flex-col">
        <NavigationBreadcrumbs />
      </div>

      <div className="flex items-center space-x-4">
        <div
          className={`transition-all duration-300 ease-in-out border rounded flex items-center bg-gray-100 overflow-hidden ${
            searchOpen ? "w-64" : "w-8"
          }`}
        >
          <input
            autoFocus={searchOpen}
            className={`bg-transparent outline-none px-2 w-full ${
              searchOpen ? "block" : "hidden"
            }`}
            placeholder={t("searchPlaceholder")}
            type="text"
          />
          <span
            className="material-icons cursor-pointer px-2"
            onClick={() => setSearchOpen((prev) => !prev)}
          >
            search
          </span>
        </div>

        <span
          className="material-icons cursor-pointer"
          onClick={() => alert("Filters clicked")}
        >
          filter_list
        </span>
        {/* View Switcher */}
        <div className="flex items-center gap-2 bg-gray-100 rounded px-2 py-1 shadow-sm">
          {[
            {
              key: "kanban",
              icon: "view_kanban",
              tooltip: t("kanbanViewTooltip", { default: "Kanban View" }),
            },
            {
              key: "list",
              icon: "view_list",
              tooltip: t("listViewTooltip", { default: "List View" }),
            },
            {
              key: "gantt",
              icon: "timeline",
              tooltip: t("ganttViewTooltip", { default: "Gantt Chart View" }),
            },
          ].map(({ key, icon, tooltip }) => (
            <Tooltip key={key} content={tooltip} placement="bottom">
              <button
                aria-label={tooltip}
                aria-pressed={view === key}
                className={`flex items-center justify-center w-9 h-9 rounded-full transition-colors duration-200 focus:outline-none ${
                  view === key
                    ? "bg-white shadow text-blue-600"
                    : "text-gray-600 hover:bg-gray-200"
                }`}
                type="button"
                onClick={() => onViewChange(key as BoardView)}
              >
                <span className="material-icons text-2xl">{icon}</span>
              </button>
            </Tooltip>
          ))}
        </div>
        {/* Delete Project Button with Modal */}
        <button
          className="group flex items-center justify-center p-2 rounded-full transition-colors duration-200 focus:outline-none hover:bg-red-100"
          style={{ lineHeight: 0 }}
          onClick={() => setShowDeleteModal(true)}
          title="Delete Project"
        >
          <span className="material-icons text-gray-500 group-hover:text-red-600 transition-colors duration-200">
            delete
          </span>
        </button>
        {/* Confirmation Modal */}
        <Modal isOpen={showDeleteModal} onOpenChange={setShowDeleteModal}>
          <ModalContent>
            <ModalHeader>Delete Project</ModalHeader>
            <ModalBody>
              <p>
                Are you sure you want to delete the project '{projectName}'?
                This action cannot be undone.
              </p>
            </ModalBody>
            <ModalFooter>
              <button
                className="px-4 py-2 rounded bg-gray-100 text-gray-700 mr-2"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
                onClick={handleDeleteProject}
                autoFocus
              >
                Delete
              </button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </header>
  );
};

export default Header;
