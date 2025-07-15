import React from "react";

interface BacklogPlanningProps {
  storyPoints: number;
  onStoryPointsChange: (v: number) => void;
  priority: number;
  onPriorityChange: (v: number) => void;
  risk: number;
  onRiskChange: (v: number) => void;
}

const BacklogPlanning: React.FC<BacklogPlanningProps> = ({
  storyPoints,
  onStoryPointsChange,
  priority,
  onPriorityChange,
  risk,
  onRiskChange,
}) => (
  <section className="mt-8">
    <div className="font-semibold text-gray-800 text-base mb-3 tracking-wide">Planning</div>
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <label className="text-xs font-medium text-gray-600 min-w-[100px]">Story Points</label>
        <input
          type="number"
          className="border rounded px-2 py-1 w-24"
          value={storyPoints}
          onChange={e => onStoryPointsChange(Number(e.target.value))}
        />
      </div>
      <div className="flex items-center gap-3">
        <label className="text-xs font-medium text-gray-600 min-w-[100px]">Priority</label>
        <input
          type="number"
          className="border rounded px-2 py-1 w-24"
          value={priority}
          onChange={e => onPriorityChange(Number(e.target.value))}
        />
      </div>
      <div className="flex items-center gap-3">
        <label className="text-xs font-medium text-gray-600 min-w-[100px]">Risk</label>
        <input
          type="number"
          className="border rounded px-2 py-1 w-24"
          value={risk}
          onChange={e => onRiskChange(Number(e.target.value))}
        />
      </div>
    </div>
  </section>
);

export default BacklogPlanning;
