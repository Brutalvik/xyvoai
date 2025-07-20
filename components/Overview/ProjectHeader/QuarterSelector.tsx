"use client";

import {
  Chip,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  useDisclosure,
} from "@heroui/react";
import { LayoutList } from "lucide-react";
import { useState } from "react";
import MilestoneSelectorModal from "@/components/Overview/ProjectHeader/MilestoneSelectorModal";

const quarterOptions = [
  { key: "Q1 2023", label: "Q1 2023" },
  { key: "Q2 2023", label: "Q2 2023" },
  { key: "Q3 2023", label: "Q3 2023" },
  { key: "Q4 2023", label: "Q4 2023" },
  { key: "Q1 2024", label: "Q1 2024" },
  { key: "milestone-modal", label: "Select from milestones" },
];

export default function QuarterSelector() {
  const [selectedQuarter, setSelectedQuarter] = useState("Q3 2023");
  const modal = useDisclosure();

  const handleAction = (key: string) => {
    if (key === "milestone-modal") {
      modal.onOpen();
    } else {
      setSelectedQuarter(key);
    }
  };

  return (
    <>
      {/* Dropdown Chip */}
      <Dropdown>
        <DropdownTrigger>
          <Chip
            color="primary"
            radius="sm"
            variant="flat"
            className="cursor-pointer"
            aria-label={`Selected quarter: ${selectedQuarter}`}
          >
            {selectedQuarter}
          </Chip>
        </DropdownTrigger>

        <DropdownMenu
          aria-label="Quarter Selection"
          onAction={(key) => handleAction(key as string)}
        >
          {quarterOptions.map((q) => (
            <DropdownItem
              key={q.key}
              startContent={
                q.key === "milestone-modal" ? <LayoutList size={14} /> : null
              }
              className={q.key === "milestone-modal" ? "text-primary" : ""}
            >
              {q.label}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>

      {/* Modal for Milestone Selection */}
      <MilestoneSelectorModal
        isOpen={modal.isOpen}
        onClose={modal.onClose}
        onSelect={(quarter) => {
          setSelectedQuarter(quarter);
        }}
      />
    </>
  );
}
