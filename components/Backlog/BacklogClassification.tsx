import React from "react";

interface BacklogClassificationProps {
  area: string;
  onAreaChange: (v: string) => void;
  iteration: string;
  onIterationChange: (v: string) => void;
  valueArea: string;
  onValueAreaChange: (v: string) => void;
}

const BacklogClassification: React.FC<BacklogClassificationProps> = ({
  area,
  onAreaChange,
  iteration,
  onIterationChange,
  valueArea,
  onValueAreaChange,
}) => (
  <section className="mt-8">
    <div className="font-semibold text-gray-800 text-base mb-3 tracking-wide">Classification</div>
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <label className="text-xs font-medium text-gray-600 min-w-[80px]">Area</label>
        <input
          className="border rounded px-2 py-1 w-56"
          value={area}
          onChange={e => onAreaChange(e.target.value)}
          placeholder="Area"
        />
      </div>
      <div className="flex items-center gap-3">
        <label className="text-xs font-medium text-gray-600 min-w-[80px]">Iteration</label>
        <input
          className="border rounded px-2 py-1 w-56"
          value={iteration}
          onChange={e => onIterationChange(e.target.value)}
          placeholder="Iteration"
        />
      </div>
      <div className="flex items-center gap-3">
        <label className="text-xs font-medium text-gray-600 min-w-[80px]">Value Area</label>
        <input
          className="border rounded px-2 py-1 w-56"
          value={valueArea}
          onChange={e => onValueAreaChange(e.target.value)}
          placeholder="Value Area"
        />
      </div>
    </div>
  </section>
);

export default BacklogClassification;
