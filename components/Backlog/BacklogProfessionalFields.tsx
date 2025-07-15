import React from "react";
import { Avatar, AvatarGroup, Tooltip } from "@heroui/react";
import InlineTextEdit from "@/components/common/InlineTextEdit";
import InlineNumberEdit from "@/components/common/InlineNumberEdit";

// Shrink-on-focus style
const shrinkStyle = `
.shrink-on-focus:focus {
  transform: scale(0.95);
  transition: transform 0.15s;
}
`;
if (typeof window !== 'undefined') {
  const style = document.createElement('style');
  style.innerHTML = shrinkStyle;
  document.head.appendChild(style);
}


export interface User {
  name: string;
  email: string;
  avatar?: string;
  designation: string;
}

interface BacklogProfessionalFieldsProps {
  assignee: User;
  onAssigneeChange: (user: User) => void;
  reporter: User;
  onReporterChange: (user: User) => void;
  watchers: User[];
  totalWatchers: number;
  description: string;
  onDescriptionChange: (val: string) => void;
  acceptanceCriteria: string;
  onAcceptanceCriteriaChange: (val: string) => void;
  attachments: any[];
  onAttachmentAdd: (file: File) => void;
  onAttachmentRemove: (index: number) => void;
  epic: string;
  onEpicChange: (val: string) => void;
  parent: string;
  onParentChange: (val: string) => void;
  labels: string[];
  onLabelsChange: (labels: string[]) => void;
  dueDate: string;
  onDueDateChange: (val: string) => void;
  type: string;
  onTypeChange: (val: string) => void;
  status: string;
  onStatusChange: (val: string) => void;
  created: string;
  updated: string;
}

export default function BacklogProfessionalFields({
  assignee,
  onAssigneeChange,
  reporter,
  onReporterChange,
  watchers,
  totalWatchers,
  description,
  onDescriptionChange,
  acceptanceCriteria,
  onAcceptanceCriteriaChange,
  attachments,
  onAttachmentAdd,
  onAttachmentRemove,
  epic,
  onEpicChange,
  parent,
  onParentChange,
  labels,
  onLabelsChange,
  dueDate,
  onDueDateChange,
  type,
  onTypeChange,
  status,
  onStatusChange,
  created,
  updated,
}: BacklogProfessionalFieldsProps) {
  return (
    <div className="flex flex-col gap-6">
      {/* Assignee, Reporter, Watchers */}
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2">
  <span className="text-xs text-gray-500 min-w-[64px]">Assignee</span>
  <Tooltip content={assignee.designation} placement="top">
    <Avatar src={assignee.avatar} name={assignee.name} />
  </Tooltip>
  <span className="text-sm font-medium ml-2">{assignee.name}</span>
</div>
        <div className="flex items-center gap-2">
  <span className="text-xs text-gray-500 min-w-[64px]">Reporter</span>
  <Tooltip content={reporter.designation} placement="top">
    <Avatar src={reporter.avatar} name={reporter.name} />
  </Tooltip>
  <span className="text-sm font-medium ml-2">{reporter.name}</span>
</div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500 min-w-[64px]">Watching</span>
          <AvatarGroup
  isBordered
  max={3}
  renderCount={(count) => (
    <span className="text-xs text-gray-500 ml-2">+{count} more</span>
  )}
  total={totalWatchers}
>
  {watchers.map((w, i) => (
    <Tooltip key={i} content={w.designation} placement="top">
      <Avatar src={w.avatar} name={w.name} />
    </Tooltip>
  ))}
</AvatarGroup>
        </div>
      </div>
      {/* Description */}
      <div>
  <label className="text-xs font-medium text-gray-600">Description</label>
  <textarea
    className="border rounded px-2 py-2 w-full min-h-[48px] shrink-on-focus"
    value={description}
    onChange={e => onDescriptionChange(e.target.value)}
    placeholder="Add a detailed description..."
  />
</div>
      {/* Acceptance Criteria */}
      <div>
  <label className="text-xs font-medium text-gray-600">Acceptance Criteria</label>
  <textarea
    className="border rounded px-2 py-4 w-full min-h-[96px] shrink-on-focus"
    value={acceptanceCriteria}
    onChange={e => onAcceptanceCriteriaChange(e.target.value)}
    placeholder="List acceptance criteria..."
  />
</div>
      {/* Attachments */}
      <div>
        <label className="text-xs font-medium text-gray-600">Attachments</label>
        <input type="file" onChange={e => e.target.files && onAttachmentAdd(e.target.files[0])} />
        <div className="flex gap-2 mt-2">
          {attachments.map((file, idx) => (
            <div key={idx} className="flex items-center gap-1">
              <span className="text-xs text-gray-700">{file.name}</span>
              <button className="text-red-500 text-xs" onClick={() => onAttachmentRemove(idx)}>Remove</button>
            </div>
          ))}
        </div>
      </div>
      {/* Epic, Parent */}
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2">
  <span className="text-xs text-gray-500 min-w-[64px]">Epic</span>
  <select
    className="border rounded px-2 py-1 shrink-on-focus"
    value={epic}
    onChange={e => onEpicChange(e.target.value)}
  >
    <option value="">Select Epic</option>
    <option value="Epic 1">Epic 1</option>
    <option value="Epic 2">Epic 2</option>
    <option value="Epic 3">Epic 3</option>
  </select>
</div>
        <div className="flex items-center gap-2">
  <span className="text-xs text-gray-500 min-w-[64px]">Parent</span>
  <select
    className="border rounded px-2 py-1 shrink-on-focus"
    value={parent}
    onChange={e => onParentChange(e.target.value)}
  >
    <option value="">Select Parent</option>
    <option value="Parent 1">Parent 1</option>
    <option value="Parent 2">Parent 2</option>
    <option value="Parent 3">Parent 3</option>
  </select>
</div>
      </div>
      {/* Labels, Due Date, Type, Status */}
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500 min-w-[64px]">Labels</span>
          <InlineTextEdit value={labels.join(", ")} onChange={v => onLabelsChange(v.split(",").map(s => s.trim()))} placeholder="Add labels" />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500 min-w-[64px]">Due Date</span>
          <input type="date" value={dueDate} onChange={e => onDueDateChange(e.target.value)} className="border rounded px-2 py-1" />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500 min-w-[64px]">Type</span>
          <InlineTextEdit value={type} onChange={onTypeChange} placeholder="Type" />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500 min-w-[64px]">Status</span>
          <InlineTextEdit value={status} onChange={onStatusChange} placeholder="Status" />
        </div>
      </div>
      {/* Created/Updated */}
      <div className="flex items-center gap-8 text-xs text-gray-400">
        <span>Created: {created}</span>
        <span>Updated: {updated}</span>
      </div>
    </div>
  );
}
