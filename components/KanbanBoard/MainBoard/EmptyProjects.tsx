"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import { HiOutlineFolderAdd } from "react-icons/hi";

export default function EmptyProjects() {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center h-full py-16">
      <HiOutlineFolderAdd className="text-6xl text-blue-400 mb-4" />
      <h2 className="text-2xl font-bold mb-2 text-gray-800">No Projects Yet</h2>
      <p className="text-gray-500 mb-6 text-center max-w-md">
        You don&apos;t have any projects yet. Start by creating your first project to begin collaborating and tracking your work!
      </p>
      <Button
        color="primary"
        size="lg"
        onClick={() => router.push("/overview/projects/create")}
      >
        Create Project
      </Button>
    </div>
  );
}
