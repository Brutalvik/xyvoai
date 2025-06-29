"use client";

import React from "react";
import { useRouter } from "next/navigation";
import GetStarted from "@/components/Dashboard/GetStarted";
import ProjectsList from "@/components/Dashboard/ProjectList";

const IndividualDashboard = () => {
  const router = useRouter();

  const user = {
    plan: "free", // or 'pro' | 'team'
    projects: [], // list of user's projects
  };

  const plan = user.plan as "free" | "pro" | "team";
  const currentProjectCount = user.projects.length;

  const handleCreateProject = () => {
    router.push("/dashboard/individual/create-project");
  };

  return (
    <>
      {currentProjectCount !== 0 ? (
        <GetStarted
          onCreateProject={handleCreateProject}
          plan={plan}
          currentProjectCount={currentProjectCount}
        />
      ) : (
        <div>
          <ProjectsList />
        </div>
      )}
    </>
  );
};

export default IndividualDashboard;
