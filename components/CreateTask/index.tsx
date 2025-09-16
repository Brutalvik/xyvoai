"use client";

import { useState, useEffect, useRef, useMemo } from "react";
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
import { useDispatch } from "react-redux";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { getBgColor } from "@/utils";
import { AppDispatch } from "@/store";
import {
  createTask,
  updateTask,
  deleteTask,
  Task,
} from "@/store/slices/taskSlice";
import { teamMembers } from "@/components/Overview/ProjectHeader/Teammembers";

// Unified type for user
type User = {
  id: string | number;
  name: string;
  avatar?: string;
  image?: string;
};

// Comment type
type Comment = {
  userId: string;
  avatar?: string;
  comment: string;
  timestamp: string;
  name: string;
};

export default function CreateTaskAzureLike({
  onCancel,
  onCreated,
  currentUser,
  editingTask, // optional: task to edit
}: {
  onCancel?: () => void;
  onCreated?: (task: Task) => void;
  currentUser: User;
  editingTask?: Task;
}) {
  const dispatch = useDispatch<AppDispatch>();

  // ---- Form state ----
  const [title, setTitle] = useState<string>(editingTask?.title || "");
  const [tagInput, setTagInput] = useState<string>("");
  const [assignee, setAssignee] = useState(
    editingTask?.assignee?.id?.toString() || currentUser.id.toString()
  );
  const [priority, setPriority] = useState(editingTask?.priority || "low");
  const [activity, setActivity] = useState<string>(
    editingTask?.activity || "Development"
  );
  const [originalEstimate, setOriginalEstimate] = useState<number>(
    editingTask?.originalEstimate || 0
  );
  const [remaining, setRemaining] = useState<number>(
    editingTask?.remaining || 0
  );
  const [completed, setCompleted] = useState<number>(
    editingTask?.completed || 0
  );
  const [taskNumber, setTaskNumber] = useState<number>(
    editingTask?.taskNumber || Math.floor(Math.random() * 1000)
  );
  const [tags, setTags] = useState<string[]>(
    editingTask?.tags?.map((t) => t.name) || []
  );
  const [newComment, setNewComment] = useState<string>("");
  const [comments, setComments] = useState<Comment[]>(
    editingTask?.comments || []
  );

  const [editPriority, setEditPriority] = useState<boolean>(false);
  const [editActivity, setEditActivity] = useState<boolean>(false);
  const [editOriginal, setEditOriginal] = useState<boolean>(false);
  const [editCompleted, setEditCompleted] = useState<boolean>(false);

  // ---- Editable state for title & description ----
  const [isTitleEditable, setIsTitleEditable] = useState(true);
  const [isDescriptionEditable, setIsDescriptionEditable] = useState(true);

  const priorities = [
    { key: "low", label: "Low" },
    { key: "medium", label: "Medium" },
    { key: "high", label: "High" },
    { key: "critical", label: "Critical" },
  ];

  // ---- Quill editor ----
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

      if (editingTask?.description) {
        quillRef.current.root.innerHTML = editingTask.description;
      }
    }
  }, [editingTask]);

  // ---- Calculate remaining automatically ----
  useEffect(() => {
    const orig = Number(originalEstimate) || 0;
    const comp = Number(completed) || 0;
    setRemaining(Math.max(orig - comp, 0));
  }, [originalEstimate, completed]);

  // ---- Selected user & avatar ----
  const selectedUser: User = useMemo(() => {
    const user = assignee
      ? teamMembers.find((m) => m.id.toString() === assignee)
      : undefined;
    return user || currentUser;
  }, [assignee, currentUser]);

  const avatarBg = useMemo(
    () =>
      selectedUser?.id ? getBgColor(selectedUser.id.toString()) : "bg-gray-400",
    [selectedUser?.id]
  );

  // ---- Comments ----
  const handleAddComment = () => {
    if (!newComment.trim()) return;
    setComments([
      ...comments,
      {
        userId: currentUser.id.toString(),
        avatar: currentUser.avatar,
        comment: newComment,
        timestamp: new Date().toISOString(),
        name: currentUser.name,
      },
    ]);
    setNewComment("");
  };

  // ---- Submit (Create / Update) ----
  const handleSubmit = async () => {
    const description = quillRef.current?.getText().trim() || "";
    const assigneeObj =
      assignee && teamMembers.find((m) => m.id.toString() === assignee)
        ? {
            id: assignee.toString(),
            name: currentUser.name,
            avatar: currentUser.image,
          }
        : {
            id: currentUser.id.toString(),
            name: currentUser.name,
            avatar: currentUser.image,
          };
    const payload: Partial<Task> = {
      taskNumber,
      title,
      description,
      assignee: assigneeObj,
      priority,
      activity,
      originalEstimate,
      remaining,
      completed,
      tags: tags.map((t) => ({ name: t })),
      comments,
    };

    try {
      let task: Task;
      if (editingTask) {
        task = await dispatch(
          updateTask({ id: editingTask.id, updates: payload })
        ).unwrap();
      } else {
        task = await dispatch(createTask(payload)).unwrap();
      }
      onCreated?.(task);

      // Make title & description read-only after successful create/update
      setIsTitleEditable(false);
      setIsDescriptionEditable(false);
    } catch (err: any) {
      console.error("❌ Task submit failed:", err);
    }
  };

  const handleDelete = async () => {
    if (!editingTask) return;
    try {
      await dispatch(deleteTask(editingTask.id)).unwrap();
      onCancel?.();
    } catch (err: any) {
      console.error("❌ Delete task failed:", err);
    }
  };

  const getInitials = (name: string) => {
    if (!name) return "";
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  return (
    <div className="w-full flex flex-col md:flex-row gap-6 p-4">
      {/* LEFT SIDE */}
      <div className="md:w-2/3 w-full space-y-4 relative">
        <span className="absolute top-0 right-0 text-sm font-semibold text-gray-500">
          #{taskNumber}
        </span>
        <h3 className="text-xl font-semibold">
          {editingTask ? "Edit Task" : "Create Task"}
        </h3>

        {/* Title */}
        {isTitleEditable ? (
          <Input
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            onClick={() => setIsTitleEditable(true)}
          />
        ) : (
          <div
            className="cursor-pointer font-semibold text-lg"
            onClick={() => setIsTitleEditable(true)}
          >
            {title || "Untitled"}
          </div>
        )}

        {/* Description */}
        <div>
          <label className="block mb-1 font-semibold">Description</label>
          {isDescriptionEditable ? (
            <div
              ref={editorRef}
              className="bg-white dark:bg-neutral-900 min-h-[200px] border border-border rounded-md p-2"
              onClick={() => setIsDescriptionEditable(true)}
            />
          ) : (
            <div
              className="bg-gray-50 dark:bg-neutral-800 min-h-[200px] border border-border rounded-md p-2 cursor-pointer"
              dangerouslySetInnerHTML={{
                __html: quillRef.current?.root.innerHTML || "",
              }}
              onClick={() => setIsDescriptionEditable(true)}
            />
          )}
        </div>

        {/* Comments */}
        <div className="mt-4">
          <h4 className="text-sm font-semibold mb-2">Comments</h4>
          <div className="space-y-2">
            {comments.map((c, i) => (
              <div key={i} className="flex items-start gap-2">
                <Avatar
                  style={{
                    backgroundColor: getBgColor(c.userId),
                    fontSize: "0.975rem",
                    fontWeight: "700",
                    color: "#fff",
                  }}
                  size="sm"
                  src={c.avatar}
                  name={getInitials(c.name)}
                />
                <div className="flex flex-col bg-sky-100 dark:bg-sky-200 rounded-xl p-2 max-w-[80%]">
                  <div className="flex justify-between items-start gap-2">
                    <span className="text-sm">{c.comment}</span>
                    <span className="text-xs text-gray-500 whitespace-nowrap">
                      {new Date(c.timestamp).toLocaleString()}
                    </span>
                  </div>
                </div>
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
          {editingTask && (
            <Button variant="flat" color="danger" onPress={handleDelete}>
              Delete
            </Button>
          )}
          {onCancel && (
            <Button variant="light" onPress={onCancel}>
              Cancel
            </Button>
          )}
          <Button color="primary" onPress={handleSubmit}>
            {editingTask ? "Update" : "Create"}
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
            {/* Priority */}
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
                      setPriority(
                        Array.from(keys)[0] as
                          | "low"
                          | "medium"
                          | "high"
                          | "critical"
                      );
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

            {/* Activity */}
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
                  value={originalEstimate.toString()}
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
                  value={completed.toString()}
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

            {/* Remaining */}
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
                    className="cursor-pointer text-white"
                    style={{
                      backgroundColor: avatarBg,
                      fontSize: "0.975rem",
                      fontWeight: "700",
                      color: "#fff",
                    }}
                    size="sm"
                    src={selectedUser.image || selectedUser.avatar}
                    name={getInitials(selectedUser.name)}
                  />
                  <span className="text-sm">{selectedUser.name}</span>
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
                      <Avatar
                        size="sm"
                        src={m.src}
                        name={getInitials(m.name)}
                        style={{
                          backgroundColor: getBgColor(m.id.toString()),
                          fontSize: "0.875rem",
                          fontWeight: "600",
                          color: "#fff",
                        }}
                      />
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
                color="primary"
                variant="flat"
                onClose={() => setTags(tags.filter((_, idx) => idx !== i))}
              >
                {t}
              </Chip>
            ))}
            <Input
              size="sm"
              placeholder="Add tag"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && tagInput.trim()) {
                  setTags([...tags, tagInput.trim()]);
                  setTagInput("");
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
