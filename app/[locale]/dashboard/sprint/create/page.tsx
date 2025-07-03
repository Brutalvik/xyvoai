"use client";

import React from "react";
import CreateSprintForm from "@/components/Sprint/Create";

export default function CreateSprintPage() {
  const handleSubmit = (values: any) => {
    console.log("Sprint created:", values);
    // You can POST to your backend here if ready
  };

  return (
    <div className="p-6">
      <CreateSprintForm
        teams={[
          { id: "team-1", name: "Design Team" },
          { id: "team-2", name: "Engineering" },
        ]}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
