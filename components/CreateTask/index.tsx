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
  Tooltip,
} from "@heroui/react";
import { teamMembers } from "@/components/Overview/ProjectHeader/Teammembers";
import Quill from "quill";
import "quill/dist/quill.snow.css";

export default function CreateTaskAzureLike({
  onCancel,
  onCreated,
}: {
  onCancel?: () => void;
  onCreated?: (task: any) => void;
}) {
  // Form state
  const [title, setTitle] = useState("");
  const [assignee, setAssignee] = useState("");
  const [priority, setPriority] = useState("low");
  const [activity, setActivity] = useState("Development");
  const [originalEstimate, setOriginalEstimate] = useState("0");
  const [remaining, setRemaining] = useState("0");
  const [completed, setCompleted] = useState("0");
  const [taskNumber, setTaskNumber] = useState(
    Math.floor(Math.random() * 1000)
  );

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

  const handleSubmit = () => {
    const description = quillRef.current?.root.innerHTML || "";
    const payload = {
      taskNumber,
      title,
      description,
      assignee,
      priority,
      activity,
      originalEstimate,
      remaining,
      completed,
    };
    console.log("Creating task:", payload);
    onCreated?.(payload);

    // Reset form
    setTitle("");
    setAssignee("");
    setPriority("medium");
    setActivity("Development");
    setOriginalEstimate("0");
    setRemaining("0");
    setCompleted("0");
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

              {/* Container maintains width and styling */}
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
            {[
              {
                label: "Original",
                value: originalEstimate,
                edit: editOriginal,
                set: setOriginalEstimate,
                setEdit: setEditOriginal,
              },
              {
                label: "Remaining",
                value: remaining,
                edit: editRemaining,
                set: setRemaining,
                setEdit: setEditRemaining,
              },
              {
                label: "Completed",
                value: completed,
                edit: editCompleted,
                set: setCompleted,
                setEdit: setEditCompleted,
              },
            ].map((item) => (
              <div key={item.label} className="flex flex-col">
                <label className="text-xs font-medium text-gray-600 mb-1">
                  {item.label}
                </label>
                {item.edit ? (
                  <Input
                    variant="underlined"
                    size="sm"
                    value={item.value}
                    onChange={(e) => item.set(e.target.value)}
                    onBlur={() => item.setEdit(false)}
                    autoFocus
                  />
                ) : (
                  <span
                    className="text-sm cursor-pointer"
                    onClick={() => item.setEdit(true)}
                  >
                    {item.value}
                  </span>
                )}
              </div>
            ))}
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
      </div>
    </div>
  );
}
