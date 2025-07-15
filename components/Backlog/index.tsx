"use client";
import React, { useRef, useState } from "react";
import BacklogHeader from "./BacklogHeader";
import BacklogStateBar from "./BacklogStateBar";
import BacklogDiscussion from "./BacklogDiscussion";
import BacklogPlanning from "./BacklogPlanning";
import BacklogClassification from "./BacklogClassification";
import { Button } from "@heroui/button";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import InlineTextEdit from "@/components/common/InlineTextEdit";
import BacklogProfessionalFields, {
  User,
} from "@/components/Backlog/BacklogProfessionalFields";

const SUGGESTED_TAGS = [
  "UI",
  "Backend",
  "API",
  "Bug",
  "Feature",
  "Urgent",
  "Low Priority",
];

function TagPopover({
  tags,
  onAdd,
  onRemove,
}: {
  tags: string[];
  onAdd: (t: string) => void;
  onRemove: (t: string) => void;
}) {
  const [input, setInput] = useState("");
  return (
    <div className="absolute mt-2 bg-white border rounded shadow p-2 z-50 w-56">
      <div className="mb-2 font-semibold text-xs text-gray-600">Tags</div>
      <div className="flex flex-wrap gap-1 mb-2">
        {tags.map((t) => (
          <span
            key={t}
            className="bg-blue-100 text-blue-700 rounded px-2 py-0.5 text-xs flex items-center gap-1"
          >
            {t}
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-red-500 ml-1 p-0 h-auto min-w-0"
              onClick={() => onRemove(t)}
              title="Remove tag"
            >
              ×
            </Button>
          </span>
        ))}
      </div>
      <div className="mb-2 flex flex-wrap gap-1">
        {SUGGESTED_TAGS.filter((tag) => !tags.includes(tag)).map((tag) => (
          <button
            key={tag}
            className="bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-700 rounded px-2 py-0.5 text-xs"
            onClick={() => onAdd(tag)}
          >
            {tag}
          </button>
        ))}
      </div>
      <input
        className="w-full border px-2 py-1 rounded text-sm mb-2"
        placeholder="Add tag"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && input.trim()) {
            onAdd(input.trim());
            setInput("");
          }
        }}
      />
      <button
        className="w-full bg-blue-600 text-white rounded py-1 text-xs font-semibold"
        onClick={() => {
          if (input.trim()) {
            onAdd(input.trim());
            setInput("");
          }
        }}
      >
        Add
      </button>
    </div>
  );
}
function Toolbar({
  onBold,
  onItalic,
  onEmoji,
  disabled,
}: {
  onBold: () => void;
  onItalic: () => void;
  onEmoji: () => void;
  disabled?: boolean;
}) {
  return (
    <div className="flex gap-1 text-gray-400">
      <button
        type="button"
        className="hover:text-gray-600 disabled:text-gray-200"
        onClick={onBold}
        disabled={disabled}
      >
        <span className="material-icons text-base">format_bold</span>
      </button>
      <button
        type="button"
        className="hover:text-gray-600 disabled:text-gray-200"
        onClick={onItalic}
        disabled={disabled}
      >
        <span className="material-icons text-base">format_italic</span>
      </button>
      <button
        type="button"
        className="hover:text-gray-600 disabled:text-gray-200"
        onClick={onEmoji}
        disabled={disabled}
      >
        <span className="material-icons text-base">insert_emoticon</span>
      </button>
    </div>
  );
}

dayjs.extend(relativeTime);

const USERS = [
  {
    name: "Raisa Pokrovskaya",
    email: "raisa@fiber.com",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
  },
  {
    name: "John Doe",
    email: "john@example.com",
    avatar: "https://i.pravatar.cc/150?u=a04258a2462d826712d",
  },
  {
    name: "You",
    email: "you@fiber.com",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
  },
];

export default function BacklogWorkItem() {
  // Professional fields state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [acceptanceCriteria, setAcceptanceCriteria] = useState("");
  const [attachments, setAttachments] = useState<any[]>([]);
  const [epic, setEpic] = useState("");
  const [parent, setParent] = useState("");
  const [labels, setLabels] = useState<string[]>([]);
  const [dueDate, setDueDate] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");

  // Example users for assignee, reporter, watchers
  const [assignee, setAssignee] = useState<User>({
    name: "Raisa Pokrovskaya",
    email: "raisa@fiber.com",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    designation: "Frontend Engineer",
  });
  const [reporter, setReporter] = useState<User>({
    name: "John Doe",
    email: "john@example.com",
    avatar: "https://i.pravatar.cc/150?u=a04258a2462d826712d",
    designation: "Product Manager",
  });
  const [watchers, setWatchers] = useState([
    {
      name: "Raisa Pokrovskaya",
      email: "raisa@fiber.com",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
      designation: "Frontend Engineer",
    },
    {
      name: "John Doe",
      email: "john@example.com",
      avatar: "https://i.pravatar.cc/150?u=a04258a2462d826712d",
      designation: "Product Manager",
    },
    {
      name: "You",
      email: "you@fiber.com",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
      designation: "Backend Engineer",
    },
    {
      name: "Jane Smith",
      email: "jane@fiber.com",
      avatar: "https://i.pravatar.cc/150?u=a04258114e29026302d",
      designation: "QA Analyst",
    },
    {
      name: "Alex Lee",
      email: "alex@fiber.com",
      avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
      designation: "DevOps Engineer",
    },
    {
      name: "Sam Wu",
      email: "sam@fiber.com",
      avatar: "https://i.pravatar.cc/150?u=a04258114e29026708c",
      designation: "UX Designer",
    },
  ]);
  const totalWatchers = 10;
  const [created] = useState(
    dayjs().subtract(3, "day").format("YYYY-MM-DD HH:mm")
  );
  const [updated, setUpdated] = useState(dayjs().format("YYYY-MM-DD HH:mm"));

  // Existing fields
  const [discussion, setDiscussion] = useState("");
  const [comments, setComments] = useState<any[]>([]);
  const [showPreview, setShowPreview] = useState(false);
  const [mentionDropdown, setMentionDropdown] = useState<{
    show: boolean;
    options: any[];
    anchor: number;
  }>({ show: false, options: [], anchor: 0 });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [emptyCommentAnim, setEmptyCommentAnim] = useState(false);
  const [emptyTagAnim, setEmptyTagAnim] = useState(false);
  const [storyPoints, setStoryPoints] = useState("");
  const [priority, setPriority] = useState("");
  const [risk, setRisk] = useState("");
  const [area, setArea] = useState("");
  const [iteration, setIteration] = useState("");
  const [valueArea, setValueArea] = useState("Business");
  const [state, setState] = useState("New");
  const [reason, setReason] = useState("New");
  const [tags, setTags] = useState<string[]>([]);
  const [showTagPopover, setShowTagPopover] = useState(false);
  const discussionInputRef = useRef<HTMLTextAreaElement>(null);
  const handleToolbar = (action: string) => {
    const input = discussionInputRef.current;
    if (!input) return;
    const start = input.selectionStart || 0;
    const end = input.selectionEnd || 0;
    let before = discussion.slice(0, start);
    let selected = discussion.slice(start, end);
    let after = discussion.slice(end);
    if (action === "bold") {
      selected = selected ? `**${selected}**` : "**bold**";
    } else if (action === "italic") {
      selected = selected ? `*${selected}*` : "*italic*";
    } else if (action === "emoji") {
      selected = selected ? selected + " 😊" : "😊";
    }
    const newValue = before + selected + after;
    setDiscussion(newValue);
    setTimeout(() => {
      if (input) {
        input.focus();
        input.setSelectionRange(before.length, before.length + selected.length);
      }
    }, 0);
  };

  const handleMention = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setDiscussion(value);
    const cursor = e.target.selectionStart || 0;
    const before = value.slice(0, cursor);
    const match = before.match(/@([\w]*)$/);
    if (match) {
      const search = match[1].toLowerCase();
      const filtered = USERS.filter((u) =>
        u.name.toLowerCase().includes(search)
      );
      setMentionDropdown({
        show: true,
        options: filtered,
        anchor: cursor - match[0].length,
      });
    } else {
      setMentionDropdown({ show: false, options: [], anchor: 0 });
    }
  };

  const insertMention = (user: any) => {
    if (!discussionInputRef.current) return;
    const cursor = discussionInputRef.current.selectionStart || 0;
    const before = discussion.slice(0, mentionDropdown.anchor);
    const after = discussion.slice(cursor);
    const mentionStr = `@${user.name} `;
    setDiscussion(before + mentionStr + after);
    setMentionDropdown({ show: false, options: [], anchor: 0 });
    setTimeout(() => {
      if (discussionInputRef.current) {
        discussionInputRef.current.focus();
        discussionInputRef.current.setSelectionRange(
          before.length + mentionStr.length,
          before.length + mentionStr.length
        );
      }
    }, 0);
  };

  const handleAddComment = () => {
    if (discussion.trim()) {
      setComments([
        ...comments,
        {
          user: "You",
          text: discussion,
          time: new Date().toISOString(),
          avatar: undefined,
        },
      ]);
      setDiscussion("");
      setShowPreview(false);
      setTimeout(() => setEmptyCommentAnim(false), 400);
    } else {
      setEmptyCommentAnim(true);
      setTimeout(() => setEmptyCommentAnim(false), 400);
    }
  };

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 1500);
    }, 1200);
  };

  return (
    <div className="min-h-screen w-full bg-[#f3f3f3]">
      <BacklogHeader
        title={title}
        tags={tags}
        onTitleChange={setTitle}
        onTagsChange={setTags}
        saving={saving}
        saved={saved}
        onSave={handleSave}
      />
      <BacklogStateBar
        state={state}
        onStateChange={setState}
        reason={reason}
        onReasonChange={setReason}
      />
      <div className="flex-1 p-8 flex gap-8">
        <div className="flex-1 flex flex-col gap-8">
          <BacklogProfessionalFields
            assignee={assignee}
            onAssigneeChange={setAssignee}
            reporter={reporter}
            onReporterChange={setReporter}
            watchers={watchers}
            totalWatchers={totalWatchers}
            description={description}
            onDescriptionChange={setDescription}
            acceptanceCriteria={acceptanceCriteria}
            onAcceptanceCriteriaChange={setAcceptanceCriteria}
            attachments={attachments}
            onAttachmentAdd={() => {}}
            onAttachmentRemove={() => {}}
            epic={epic}
            onEpicChange={setEpic}
            parent={parent}
            onParentChange={setParent}
            labels={labels}
            onLabelsChange={setLabels}
            dueDate={dueDate}
            onDueDateChange={setDueDate}
            type={type}
            onTypeChange={setType}
            status={status}
            onStatusChange={setStatus}
            created={created}
            updated={updated}
          />
          <BacklogDiscussion
            comments={comments}
            discussion={discussion}
            onDiscussionChange={setDiscussion}
            onAddComment={handleAddComment}
            loading={false}
          />
        </div>
        <div className="w-80 flex flex-col gap-6 mt-8">
          <BacklogPlanning
            storyPoints={Number(storyPoints) || 0}
            onStoryPointsChange={(v) => setStoryPoints(String(v))}
            priority={Number(priority) || 0}
            onPriorityChange={(v) => setPriority(String(v))}
            risk={Number(risk) || 0}
            onRiskChange={(v) => setRisk(String(v))}
          />
          <BacklogClassification
            area={area}
            onAreaChange={setArea}
            iteration={iteration}
            onIterationChange={setIteration}
            valueArea={valueArea}
            onValueAreaChange={setValueArea}
          />
        </div>
      </div>
    </div>
  );
}
