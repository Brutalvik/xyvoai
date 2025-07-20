"use client";

import {
  Avatar,
  AvatarGroup,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Tooltip,
  Input,
} from "@heroui/react";
import { useState } from "react";

export interface Member {
  name: string;
  src: string;
}

interface Props {
  members: Member[];
  maxVisible: number;
}

export default function MemberSelector({ members, maxVisible }: Props) {
  const [search, setSearch] = useState("");

  const filteredMembers = members.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Dropdown>
      <Tooltip content={`Total Members: ${members.length}`}>
        <DropdownTrigger>
          <div className="cursor-pointer">
            <AvatarGroup
              isBordered
              size="sm"
              className="shrink-0"
              max={maxVisible}
            >
              {members.map((m, idx) => (
                <Avatar key={idx} src={m.src} name={m.name} />
              ))}
            </AvatarGroup>
          </div>
        </DropdownTrigger>
      </Tooltip>

      <DropdownMenu
        aria-label="All team members"
        className="max-h-[300px] overflow-y-auto scrollbar-hide p-1 rounded-md w-56"
        // ✅ Key prop required
        items={filteredMembers.map((m, idx) => ({
          key: idx.toString(),
          name: m.name,
          src: m.src,
        }))}
      >
        {(item) => (
          <DropdownItem key={item.key} textValue={item.name}>
            <div className="flex items-center gap-3">
              <Avatar size="sm" src={item.src} name={item.name} />
              <span className="text-sm text-default-900 truncate">
                {item.name}
              </span>
            </div>
          </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  );
}
