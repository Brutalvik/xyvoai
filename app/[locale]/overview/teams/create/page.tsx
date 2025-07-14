"use client";

import { Card, CardBody } from "@heroui/card";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { addToast } from "@heroui/react";

import TeamForm from "@/components/Team/Form";

const dummyUsers = [
  { id: "1", name: "Alice Johnson" },
  { id: "2", name: "Bob Smith" },
  { id: "3", name: "Charlie Davis" },
];

export default function CreateTeamPage() {
  const t = useTranslations("Team");
  const router = useRouter();

  const handleCreate = async (values: any) => {
    try {
      console.log("Creating team:", values);
      // TODO: Replace with actual API call
      addToast({ title: "Team created successfully", variant: "solid" });
      router.push("/overview/teams");
    } catch (error) {
      addToast({ title: "Failed to create team", variant: "flat" });
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <Card>
        <CardBody>
          <TeamForm isEdit={false} users={dummyUsers} onSubmit={handleCreate} />
        </CardBody>
      </Card>
    </div>
  );
}
