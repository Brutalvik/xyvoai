"use client";

import { useState, useEffect, useRef } from "react";
import {
  Button,
  Input,
  Avatar,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Select,
  SelectItem,
  Chip,
} from "@heroui/react";
import { teamMembers } from "@/components/Overview/ProjectHeader/Teammembers";
import Quill from "quill";
import "quill/dist/quill.snow.css";

export default function CreateTaskAzureLike({
  onCancel,
  onCreated,
  currentUser,
}: {
  onCancel?: () => void;
  onCreated?: (task: any) => void;
  currentUser: { id: string; name: string; avatar?: string };
}) {
  // Form state
  const [title, setTitle] = useState("");
  const [assignee, setAssignee] = useState("");
  const [priority, setPriority] = useState("low");
  const [activity, setActivity] = useState("Development");
  const [originalEstimate, setOriginalEstimate] = useState(0);
  const [remaining, setRemaining] = useState(0);
  const [completed, setCompleted] = useState(0);
  const [taskNumber, setTaskNumber] = useState(
    Math.floor(Math.random() * 1000)
  );

  const [tags, setTags] = useState<string[]>([]);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState<
    { userId: string; avatar?: string; comment: string; timestamp: string }[]
  >([]);

  // Edit toggles
  const priorities = [
    { key: "low", label: "Low" },
    { key: "medium", label: "Medium" },
    { key: "high", label: "High" },
    { key: "critical", label: "Critical" },
  ];
  const [editPriority, setEditPriority] = useState(false);
  const [editActivity, setEditActivity] = useState(false);
  const [editOriginal, setEditOriginal] = useState(false);
  const [editRemaining, setEditRemaining] = useState(false);
  const [editCompleted, setEditCompleted] = useState(false);

  // Quill
  const editorRef = useRef<HTMLDivElement | null>(null);
  const quillRef = useRef<Quill | null>(null);

  useEffect(() => {
    if (editorRef.current && !quillRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, false] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [
              { list: "ordered" },
              { list: "bullet" },
              { indent: "-1" },
              { indent: "+1" },
            ],
            ["link", "image"],
            ["clean"],
          ],
        },
      });
    }
  }, []);

  // Random assignee
  useEffect(() => {
    if (!assignee && teamMembers.length > 0) {
      const random =
        teamMembers[Math.floor(Math.random() * teamMembers.length)];
      setAssignee(random.id.toString());
    }
  }, [assignee]);

  // Update remaining automatically
  useEffect(() => {
    const orig = Number(originalEstimate) || 0;
    const comp = Number(completed) || 0;
    setRemaining(Math.max(orig - comp, 0));
  }, [originalEstimate, completed]);

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    setComments([
      ...comments,
      {
        userId: currentUser.id,
        avatar: currentUser.avatar,
        comment: newComment,
        timestamp: new Date().toISOString(),
      },
    ]);
    setNewComment("");
  };

  const handleSubmit = () => {
    const description = quillRef.current?.root.innerHTML || "";
    const payload = {
      taskNumber,
      title,
      description,
      assignee: assignee
        ? teamMembers.find((m) => m.id?.toString() === assignee)
        : null,
      priority,
      activity,
      originalEstimate,
      remaining,
      completed,
      tags: tags.map((t) => ({ name: t })),
      comments,
    };
    console.log("Creating task:", payload);
    onCreated?.(payload);

    // Reset form
    setTitle("");
    setAssignee("");
    setPriority("medium");
    setActivity("Development");
    setOriginalEstimate(0);
    setRemaining(0);
    setCompleted(0);
    setTags([]);
    setComments([]);
    quillRef.current?.setContents([]);
    setTaskNumber(Math.floor(Math.random() * 1000));
  };

  return (
    <div className="w-full flex flex-col md:flex-row gap-6 p-4">
      {/* LEFT SIDE */}
      <div className="md:w-2/3 w-full space-y-4 relative">
        <span className="absolute top-0 right-0 text-sm font-semibold text-gray-500">
          #{taskNumber}
        </span>
        <h3 className="text-xl font-semibold">Create Task</h3>
        <Input
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
        />
        <div>
          <label className="block mb-1 font-semibold">Description</label>
          <div
            ref={editorRef}
            className="bg-white dark:bg-neutral-900 min-h-[200px] border border-border rounded-md p-2"
          />
        </div>

        {/* Comments */}
        <div className="mt-4">
          <h4 className="text-sm font-semibold mb-1">Comments</h4>
          <div className="space-y-2">
            {comments.map((c, i) => (
              <div key={i} className="flex items-center gap-2">
                <Avatar size="sm" src={c.avatar} name={c.userId} />
                <div className="text-sm">{c.comment}</div>
              </div>
            ))}
          </div>
          <div className="flex gap-2 mt-2">
            <Input
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              fullWidth
              size="sm"
            />
            <Button size="sm" onPress={handleAddComment}>
              Add
            </Button>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-2">
          {onCancel && (
            <Button variant="light" onPress={onCancel}>
              Cancel
            </Button>
          )}
          <Button color="primary" onPress={handleSubmit}>
            Create
          </Button>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="md:w-1/3 w-full space-y-6">
        {/* Planning */}
        <div>
          <h4 className="text-sm font-semibold uppercase border-b border-gray-300 pb-1">
            Planning
          </h4>
          <div className="mt-3 space-y-3">
            <div className="flex flex-col">
              <label className="text-xs font-medium text-gray-600 mb-1">
                Priority
              </label>
              <div
                className="relative cursor-pointer text-sm"
                onClick={() => setEditPriority(true)}
              >
                {editPriority ? (
                  <Select
                    aria-label="Priority"
                    variant="underlined"
                    selectedKeys={[priority]}
                    onSelectionChange={(keys) => {
                      setPriority(Array.from(keys)[0] as string);
                      setEditPriority(false);
                    }}
                    size="sm"
                  >
                    {priorities.map((p) => (
                      <SelectItem key={p.key}>{p.label}</SelectItem>
                    ))}
                  </Select>
                ) : (
                  <span>
                    {priorities.find((p) => p.key === priority)?.label}
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-xs font-medium text-gray-600 mb-1">
                Activity
              </label>
              {editActivity ? (
                <Input
                  variant="underlined"
                  size="sm"
                  value={activity}
                  onChange={(e) => setActivity(e.target.value)}
                  onBlur={() => setEditActivity(false)}
                  autoFocus
                />
              ) : (
                <span
                  className="text-sm cursor-pointer"
                  onClick={() => setEditActivity(true)}
                >
                  {activity}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Effort */}
        <div>
          <h4 className="text-sm font-semibold uppercase border-b border-gray-300 pb-1">
            Effort
          </h4>
          <div className="mt-3 space-y-3">
            {/* Original */}
            <div className="flex flex-col">
              <label className="text-xs font-medium text-gray-600 mb-1">
                Original
              </label>
              {editOriginal ? (
                <Input
                  variant="underlined"
                  size="sm"
                  value={originalEstimate?.toString()}
                  onChange={(e) =>
                    setOriginalEstimate(Number(e.target.value) || 0)
                  }
                  onBlur={() => setEditOriginal(false)}
                  autoFocus
                />
              ) : (
                <span
                  className="text-sm cursor-pointer"
                  onClick={() => setEditOriginal(true)}
                >
                  {originalEstimate}
                </span>
              )}
            </div>

            {/* Completed */}
            <div className="flex flex-col">
              <label className="text-xs font-medium text-gray-600 mb-1">
                Completed
              </label>
              {editCompleted ? (
                <Input
                  variant="underlined"
                  size="sm"
                  value={completed?.toString()}
                  onChange={(e) => setCompleted(Number(e.target.value) || 0)}
                  onBlur={() => setEditCompleted(false)}
                  autoFocus
                />
              ) : (
                <span
                  className="text-sm cursor-pointer"
                  onClick={() => setEditCompleted(true)}
                >
                  {completed}
                </span>
              )}
            </div>

            {/* Remaining (read-only) */}
            <div className="flex flex-col">
              <label className="text-xs font-medium text-gray-600 mb-1">
                Remaining
              </label>
              <span className="text-sm">{remaining}</span>
            </div>
          </div>
        </div>

        {/* Assigned To */}
        <div>
          <h4 className="text-sm font-semibold uppercase border-b border-gray-300 pb-1">
            Assigned To
          </h4>
          <div className="mt-3">
            <Dropdown>
              <DropdownTrigger>
                <div className="flex items-center gap-2 cursor-pointer">
                  <Avatar
                    size="sm"
                    src={
                      assignee
                        ? teamMembers.find((m) => m.id?.toString() === assignee)
                            ?.src
                        : undefined
                    }
                    name={
                      assignee
                        ? teamMembers.find((m) => m.id?.toString() === assignee)
                            ?.name
                        : "Unassigned"
                    }
                  />
                  <span className="text-sm">
                    {assignee
                      ? teamMembers.find((m) => m.id?.toString() === assignee)
                          ?.name
                      : "Unassigned"}
                  </span>
                </div>
              </DropdownTrigger>
              <DropdownMenu aria-label="Select Assignee" variant="faded">
                {teamMembers.map((m) => (
                  <DropdownItem
                    key={m.id}
                    onClick={() => setAssignee(m.id.toString())}
                    className="flex flex-row items-center gap-2"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar size="sm" src={m.src} name={m.name} />
                      <span className="text-sm text-default-900 truncate">
                        {m.name}
                      </span>
                    </div>
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>

        {/* Tags */}
        <div>
          <h4 className="text-sm font-semibold uppercase border-b border-gray-300 pb-1">
            Tags
          </h4>
          <div className="flex flex-wrap gap-2 mt-2">
            {tags.map((t, i) => (
              <Chip
                key={i}
                variant="light"
                onClose={() => setTags(tags.filter((_, idx) => idx !== i))}
              >
                {t}
              </Chip>
            ))}
            <Input
              size="sm"
              placeholder="Add tag"
              value={""}
              onChange={() => {}}
              onKeyDown={(e) => {
                if (e.key === "Enter" && e.currentTarget.value.trim()) {
                  setTags([...tags, e.currentTarget.value.trim()]);
                  e.currentTarget.value = "";
                  e.preventDefault();
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
