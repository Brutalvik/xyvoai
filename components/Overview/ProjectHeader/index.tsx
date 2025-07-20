"use client";

import {
  Avatar,
  AvatarGroup,
  Button,
  Chip,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Tooltip,
} from "@heroui/react";
import { Plus, UserPlus, MoreVertical } from "lucide-react";
import { useState } from "react";
import { teamMembers } from "@/components/Overview/ProjectHeader/Teammembers";

export default function ProjectHeader() {
  const [title, setTitle] = useState("Product Development");
  const [editing, setEditing] = useState(false);

  const handleInvite = () => alert("Invite functionality coming soon.");
  const handleNewTask = () => alert("Create Task functionality coming soon.");

  return (
    <div className="w-full border-b border-gray-200 dark:border-neutral-700 px-4 py-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Left: Title and Quarter */}
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
          <Chip color="primary" radius="sm" variant="flat" className="text-xs">
            Q3 2023
          </Chip>
        </div>

        {/* Right: Buttons and Avatars */}
        <div className="flex items-center gap-3 ml-auto">
          {/* 👇 Mobile (xs) only: Action menu */}
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

          {/* 👇 Tablet & up: Show buttons inline */}
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

          {/* 👇 Avatars (responsive max) */}
          <Dropdown>
            <Tooltip content={`Total Members: ${teamMembers.length}`}>
              <DropdownTrigger>
                <div className="cursor-pointer">
                  <AvatarGroup
                    isBordered
                    size="sm"
                    className="shrink-0"
                    max={4}
                  >
                    {teamMembers.map((member, idx) => (
                      <Avatar key={idx} src={member.src} name={member.name} />
                    ))}
                  </AvatarGroup>
                </div>
              </DropdownTrigger>
            </Tooltip>
            {/* Avatar Dropdown Menu */}
            <DropdownMenu
              aria-label="All team members"
              className="max-h-[300px] overflow-y-auto scrollbar-hide p-1 rounded-md"
              itemClasses={{
                base: "flex items-center gap-3 px-3 py-2 rounded-md hover:bg-default-100 transition-colors",
              }}
            >
              {teamMembers.map((member, index) => (
                <DropdownItem key={index} className="!p-0">
                  <div className="flex items-center gap-3 w-full px-3 py-2">
                    <Avatar size="sm" src={member.src} />
                    <span className="text-sm text-default-900 truncate">
                      {member.name}
                    </span>
                  </div>
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    </div>
  );
}
