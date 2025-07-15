import React from "react";

interface BacklogStateBarProps {
  state: string;
  onStateChange: (value: string) => void;
  reason: string;
  onReasonChange: (value: string) => void;
}

const BacklogStateBar: React.FC<BacklogStateBarProps> = ({
  state,
  onStateChange,
  reason,
  onReasonChange,
}) => (
  <div className="flex items-center gap-8 px-8 py-2 bg-white border-b border-gray-100 text-sm">
    <div className="flex gap-2 items-center">
      <span className="text-gray-500">State</span>
      <select
        className="border-none bg-transparent text-gray-700 font-medium focus:ring-2 focus:ring-blue-200 rounded"
        value={state}
        onChange={(e) => onStateChange(e.target.value)}
      >
        <option value="New">New</option>
        <option value="Active">Active</option>
        <option value="Resolved">Resolved</option>
        <option value="Closed">Closed</option>
        <option value="Removed">Removed</option>
      </select>
    </div>
    <div className="flex gap-2 items-center">
      <span className="text-gray-500">Reason</span>
      <select
        className="border-none bg-transparent text-gray-700 font-medium focus:ring-2 focus:ring-blue-200 rounded"
        value={reason}
        onChange={(e) => onReasonChange(e.target.value)}
      >
        <option value="New">New</option>
        <option value="Work started">Work started</option>
        <option value="Completed">Completed</option>
        <option value="Blocked">Blocked</option>
        <option value="Removed">Removed</option>
      </select>
    </div>
  </div>
);

export default BacklogStateBar;
