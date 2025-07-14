"use client";

import React from "react";
import { addToast } from "@heroui/react";

import IssueCreateForm from "@/components/Issue";

const dummySprints = [
  { id: "sprint-1", name: "Sprint 1 – July" },
  { id: "sprint-2", name: "Sprint 2 – August" },
];

const dummyUsers = [
  { id: "u1", name: "Alice Johnson" },
  { id: "u2", name: "Bob Smith" },
  { id: "u3", name: "Charlie Nguyen" },
];

const CreateIssue = () => {
  return (
    <IssueCreateForm
      sprints={dummySprints}
      users={dummyUsers}
      onSubmit={(values) => {
        console.log("🚀 New Issue Submitted:", values);
        addToast({
          title: "Issue submitted!",
          color: "success",
          closeIcon: true,
        });
      }}
    />
  );
};

export default CreateIssue;
