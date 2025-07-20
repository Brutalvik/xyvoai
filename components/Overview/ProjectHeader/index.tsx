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

export default function ProjectHeader() {
  const [title, setTitle] = useState("Product Development");
  const [editing, setEditing] = useState(false);

  const handleInvite = () => alert("Invite functionality coming soon.");
  const handleNewTask = () => alert("Create Task functionality coming soon.");

  return (
    <div className="w-full border-b border-gray-200 dark:border-neutral-700 px-4 py-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Left: Title and QuarterSelector */}
        <div className="flex items-center gap-2 min-w-0">
          {editing ? (
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={() => setEditing(false)}
              autoFocus
              className="text-base font-semibold truncate px-1 py-0.5 border-b border-primary focus:outline-none bg-transparent text-default-900 dark:text-white"
            />
          ) : (
            <h2
              className="text-base font-semibold truncate text-default-900 dark:text-white cursor-pointer"
              onClick={() => setEditing(true)}
            >
              {title}
            </h2>
          )}
          <QuarterSelector />
        </div>

        {/* Right: Actions and Members */}
        <div className="flex items-center gap-3 ml-auto">
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
                <DropdownItem
                  key="task"
                  startContent={<Plus size={16} />}
                  onClick={handleNewTask}
                >
                  New Task
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>

          {/* Tablet/Desktop buttons */}
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

            <Button
              color="primary"
              variant="solid"
              size="sm"
              startContent={<Plus size={16} />}
              onPress={handleNewTask}
            >
              New Task
            </Button>
          </div>

          {/* Avatar Dropdown with Search */}
          <MemberSelector members={teamMembers} maxVisible={4} />
        </div>
      </div>
    </div>
  );
}
