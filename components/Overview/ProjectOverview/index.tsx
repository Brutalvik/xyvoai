"use client";

import {
  Card,
  CardBody,
  CardHeader,
  Avatar,
  Chip,
  Button,
  Progress,
  Divider,
} from "@heroui/react";
import { HiHeart, HiOutlineHeart, HiEye } from "react-icons/hi";
import { useState, useMemo } from "react";

import { useAppSelector } from "@/store/hooks";
import { Project } from "@/types";

interface Props {
  projectId: string;
}

export default function ProjectOverview({ projectId }: Props) {
  const [liked, setLiked] = useState(false);
  const { items: projects } = useAppSelector((s) => s.projects);

  const project: Project | undefined = useMemo(() => {
    return projects.find((p: Project) => p.id === projectId);
  }, [projectId, projects]);

  if (!project) {
    return (
      <div className="text-center text-gray-500 py-20">Project not found.</div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <div className="flex justify-between items-start mb-6">
        <div>
          <div className="flex items-center gap-3 flex-wrap">
            <Avatar name={project.name} radius="md" />
            <h1 className="text-3xl font-bold">{project.name}</h1>
            <Chip
              color={project.visibility === "private" ? "secondary" : "success"}
              size="sm"
            >
              {project.visibility.charAt(0).toUpperCase() +
                project.visibility.slice(1)}
            </Chip>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            isIconOnly
            aria-label="Like project"
            size="sm"
            variant="light"
            onPress={() => setLiked(!liked)}
          >
            {liked ? (
              <HiHeart className="text-danger w-5 h-5" />
            ) : (
              <HiOutlineHeart className="text-gray-500 w-5 h-5" />
            )}
          </Button>
          <Button color="primary" startContent={<HiEye />} variant="solid">
            View Live
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* About Project */}
        <Card className="md:col-span-2">
          <CardHeader>
            <h2 className="text-lg font-semibold">About this project</h2>
          </CardHeader>
          <CardBody className="space-y-4">
            <p className="text-sm text-default-600">
              {project.description ||
                "No project description provided. You can add one in settings."}
            </p>

            <Divider />
            <div className="space-y-1 text-sm">
              <p>
                <strong>Wiki:</strong>{" "}
                <a className="text-primary underline" href="#">
                  Home
                </a>
              </p>
              <p>Welcome to the {project.name} wiki.</p>
              <p className="text-default-600">
                In these pages you can learn about:
              </p>
              <ul className="list-disc list-inside text-default-600">
                <li>Submitting bugs</li>
                <li>Suggesting new features</li>
                <li>Build extensions</li>
                <li>Commenting</li>
                <li>Submitting pull requests</li>
              </ul>
              <p className="font-semibold">Save your work as you work</p>
              <p className="font-semibold">Use Markdown in PR</p>
            </div>
          </CardBody>
        </Card>

        {/* Project Stats */}
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold">Project stats</h2>
          </CardHeader>
          <CardBody className="space-y-4">
            <div>
              <p className="text-sm font-medium mb-1">Boards</p>
              <div className="flex justify-between text-sm">
                <span>Work items created</span>
                <span>0</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Work items completed</span>
                <span>2</span>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium mb-1">Repos</p>
              <div className="flex justify-between text-sm">
                <span>Pull requests opened</span>
                <span>2</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Commits by authors</span>
                <span>6</span>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium mb-1">Pipelines</p>
              <div className="flex justify-between text-sm">
                <span>Builds succeeded</span>
                <Progress
                  className="w-32"
                  color="success"
                  size="sm"
                  value={100}
                />
              </div>
              <div className="flex justify-between text-sm">
                <span>Deployments succeeded</span>
                <Progress className="w-32" color="danger" size="sm" value={0} />
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Members */}
        <Card className="md:col-span-3">
          <CardHeader>
            <h2 className="text-lg font-semibold">Members</h2>
          </CardHeader>
          <CardBody>
            <div className="flex items-center gap-3 flex-wrap">
              {Array.from({ length: 12 }).map((_, idx) => (
                <Avatar
                  key={idx}
                  className="border"
                  name={`User ${idx + 1}`}
                  size="sm"
                />
              ))}
              <Chip color="default" size="sm" variant="flat">
                +8 more
              </Chip>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
