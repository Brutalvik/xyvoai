"use client";

import {
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import { Plus, UserPlus, MoreVertical } from "lucide-react";
import { useState } from "react";

import { teamMembers } from "@/components/Overview/ProjectHeader/Teammembers";
import QuarterSelector from "@/components/Overview/ProjectHeader/QuarterSelector";
import MemberSelector from "@/components/Overview/ProjectHeader/MemberSelector";

import { FaFileCirclePlus, FaFolderPlus } from "react-icons/fa6";
import { BsClipboardPlusFill } from "react-icons/bs";

interface ProjectHeaderProps {
  viewMode: "kanban" | "table" | "gantt" | "createTask";
  setViewMode: (mode: "kanban" | "table" | "gantt" | "createTask") => void;
}

export default function ProjectHeader({
  viewMode,
  setViewMode,
}: ProjectHeaderProps) {
  const [title, setTitle] = useState("Product Development");
  const [editing, setEditing] = useState(false);

  const handleInvite = () => alert("Invite functionality coming soon.");
  const handleNewTask = () => {
    setViewMode("createTask");
  };

  return (
    <div className="w-full border-b border-gray-200 px-4 py-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Left */}
        <div className="flex items-center gap-2 min-w-0">
          {editing ? (
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={() => setEditing(false)}
              autoFocus
              className="text-base font-semibold truncate px-1 py-0.5 border-b border-primary focus:outline-none bg-transparent"
            />
          ) : (
            <h2
              className="text-base font-semibold truncate cursor-pointer"
              onClick={() => setEditing(true)}
            >
              {title}
            </h2>
          )}
          <QuarterSelector />
        </div>

        {/* Right */}
        <div className="flex items-center gap-3 ml-auto">
          {/* View toggle */}
          <div className="flex rounded overflow-hidden">
            <Button
              variant={viewMode === "kanban" ? "solid" : "ghost"}
              color={viewMode === "kanban" ? "primary" : "default"}
              size="sm"
              onPress={() => setViewMode("kanban")}
            >
              Kanban
            </Button>
            <Button
              variant={viewMode === "table" ? "solid" : "ghost"}
              color={viewMode === "table" ? "primary" : "default"}
              size="sm"
              onPress={() => setViewMode("table")}
            >
              Table
            </Button>
            <Button
              variant={viewMode === "gantt" ? "solid" : "ghost"}
              color={viewMode === "gantt" ? "primary" : "default"}
              size="sm"
              onPress={() => setViewMode("gantt")}
            >
              Gantt
            </Button>
          </div>

          {/* Mobile dropdown */}
          <div className="flex sm:hidden">
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="flat">
                  <MoreVertical size={18} />
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Project actions">
                <DropdownItem
                  key="invite"
                  startContent={<UserPlus size={16} />}
                  onClick={handleInvite}
                >
                  Invite
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>

          {/* Desktop */}
          <div className="hidden sm:flex gap-2">
            <Button
              color="default"
              variant="ghost"
              size="sm"
              startContent={<UserPlus size={16} />}
              onPress={handleInvite}
            >
              Invite
            </Button>
            <Dropdown>
              <DropdownTrigger>
                <Button
                  color="primary"
                  variant="solid"
                  size="sm"
                  startContent={<Plus size={16} />}
                >
                  New
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Create menu" variant="faded">
                <DropdownItem
                  key="create-task"
                  shortcut="⌘T"
                  startContent={<FaFileCirclePlus />}
                  onClick={handleNewTask}
                >
                  Task
                </DropdownItem>
                <DropdownItem
                  key="create-project"
                  shortcut="⌘P"
                  startContent={<FaFolderPlus />}
                  onClick={() => alert("Create Project coming soon.")}
                >
                  Project
                </DropdownItem>
                <DropdownItem
                  key="new-backlog"
                  shortcut="⌘P"
                  startContent={<BsClipboardPlusFill />}
                  onClick={() => alert("Create Backlog coming soon.")}
                >
                  Backlog
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>

          <MemberSelector members={teamMembers} maxVisible={4} />
        </div>
      </div>
    </div>
  );
}
