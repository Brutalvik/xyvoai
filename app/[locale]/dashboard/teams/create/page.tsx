"use client";

import CreateTeamForm from "@/components/Team/Create";
import { Card, CardBody } from "@heroui/card";
import { useTranslations } from "next-intl";

export default function CreateTeamPage() {
  const t = useTranslations("Team");

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <Card>
        <CardBody>
          <CreateTeamForm
            onSubmit={(values: any) => {
              console.log("Submitted team:", values);
              // You can redirect or show a toast here
            }}
            users={[]}
          />
        </CardBody>
      </Card>
    </div>
  );
}
