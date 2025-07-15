import React, { useState } from "react";
import BacklogWorkItem from "@/components/Backlog";

export default function BacklogPanel() {
  // You can add state here for showing/hiding the backlog form if needed
  // For now, always show the backlog UI
  return (
    <div className="bg-white rounded-xl shadow p-8 flex flex-col items-center justify-center min-h-[400px] border border-gray-200 w-full">
      <BacklogWorkItem />
    </div>
  );
}
