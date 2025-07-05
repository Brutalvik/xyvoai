"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import TeamForm from "@/components/Team/Form";
import { addToast, Card, CardBody } from "@heroui/react";

// Dummy API substitute
const dummyTeam = {
  id: "team123",
  name: "Growth Team",
  description: "Handles product growth and marketing",
  visibility: "private",
  lead: "1",
  members: ["1", "2"],
  timezone: "America/Toronto",
  tags: "growth,marketing",
  color: "#3b82f6",
};

const dummyUsers = [
  { id: "1", name: "Alice Johnson" },
  { id: "2", name: "Bob Smith" },
  { id: "3", name: "Charlie Davis" },
];

export default function TeamSettingsPage() {
  const router = useRouter();
  const { id } = useParams();
  const [teamData, setTeamData] = useState<any | null>(null);

  useEffect(() => {
    // Replace with actual API call
    setTimeout(() => {
      setTeamData(dummyTeam);
    }, 300);
  }, [id]);

  const handleUpdate = async (values: any) => {
    try {
      console.log("Updating team:", values);
      // TODO: Replace with actual update API call
      addToast({ title: "Team updated successfully", variant: "solid" });
      router.push("/overview/teams");
    } catch (error) {
      addToast({ title: "Failed to update team", variant: "flat" });
    }
  };

  if (!teamData) return <div className="p-6">Loading team data...</div>;

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <Card>
        <CardBody>
          <TeamForm
            users={dummyUsers}
            onSubmit={handleUpdate}
            initialValues={teamData}
            isEdit={true}
          />
        </CardBody>
      </Card>
    </div>
  );
}
