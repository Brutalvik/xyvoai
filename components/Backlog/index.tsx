"use client";
import React, { useRef, useState } from "react";
import { Button } from "@heroui/button";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import InlineNumberEdit from "@/components/common/InlineNumberEdit";
import InlineTextEdit from "@/components/common/InlineTextEdit";

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
  { name: "Raisa Pokrovskaya", email: "raisa@fiber.com", avatar: undefined },
  { name: "John Doe", email: "john@example.com", avatar: undefined },
  { name: "You", email: "you@fiber.com", avatar: undefined },
];

export default function BacklogWorkItem() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [acceptanceCriteria, setAcceptanceCriteria] = useState("");
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
      <header className="sticky top-0 z-20 bg-white border-b border-gray-200 shadow-sm flex items-center gap-3 px-8 py-4">
        <span className="material-icons text-blue-500 text-2xl">
          assignment
        </span>
        <input
          className="text-xl font-semibold bg-transparent outline-none border-none focus:ring-2 focus:ring-blue-200 focus:bg-blue-50 transition min-w-[200px]"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <span className="ml-2 px-2 py-1 rounded bg-blue-50 text-blue-700 text-xs font-semibold">
          Backlog
        </span>
        <button
          className="ml-2 px-3 py-1 border rounded text-xs text-gray-600 bg-gray-100 hover:bg-gray-200 relative"
          onClick={() => setShowTagPopover((v) => !v)}
        >
          Add tag
          {showTagPopover && (
            <TagPopover
              tags={tags}
              onAdd={(t) => setTags([...tags, t])}
              onRemove={(t) => setTags(tags.filter((tag) => tag !== t))}
            />
          )}
        </button>
        <div className="flex gap-1 ml-2">
          {tags.map((t) => (
            <span
              key={t}
              className="bg-blue-100 text-blue-700 rounded px-2 py-0.5 text-xs flex items-center gap-1"
            >
              {t}
              <button
                className="text-gray-400 hover:text-red-500 ml-1"
                onClick={() => setTags(tags.filter((tag) => tag !== t))}
              >
                ×
              </button>
            </span>
          ))}
        </div>
        <div className="flex-1" />
        <button
          className={`relative bg-blue-600 hover:bg-blue-700 transition text-white px-5 py-2 rounded font-semibold shadow-sm flex items-center gap-2 ${saving ? "opacity-60 pointer-events-none" : ""}`}
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? (
            <span className="loader border-white border-2 border-t-blue-600 animate-spin rounded-full w-4 h-4 mr-2" />
          ) : saved ? (
            <span className="material-icons text-green-400">check_circle</span>
          ) : (
            "Save & Close"
          )}
        </button>
      </header>

      <div className="flex items-center gap-8 px-8 py-2 bg-white border-b border-gray-100 text-sm">
        <div className="flex gap-2 items-center">
          <span className="text-gray-500">State</span>
          <select
            className="border-none bg-transparent text-gray-700 font-medium focus:ring-2 focus:ring-blue-200 rounded"
            value={state}
            onChange={(e) => setState(e.target.value)}
          >
            <option value="New">New</option>
            <option value="Active">Active</option>
            <option value="Resolved">Resolved</option>
            <option value="Closed">Closed</option>
            <option value="Removed">Removed</option>
          </select>
        </div>
        <div className="flex gap-2 items-center">
          <span className="text-gray-500">Reason</span>
          <select
            className="border-none bg-transparent text-gray-700 font-medium focus:ring-2 focus:ring-blue-200 rounded"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          >
            <option value="New">New</option>
            <option value="Work started">Work started</option>
            <option value="Completed">Completed</option>
            <option value="Blocked">Blocked</option>
            <option value="Removed">Removed</option>
          </select>
        </div>
      </div>

      <div className="flex flex-1 gap-8 p-8">
        <div className="flex-1">
          <section className="flex flex-col gap-4">
            <div className="font-semibold text-gray-800 text-base mb-3 tracking-wide">
              Discussion
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-gray-600 mb-1">
                Comment
              </label>
              <textarea
                ref={discussionInputRef}
                className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-200"
                placeholder="Type a comment..."
                value={discussion}
                onChange={handleMention}
              />
              <Toolbar
                onBold={() => handleToolbar("bold")}
                onItalic={() => handleToolbar("italic")}
                onEmoji={() => handleToolbar("emoji")}
              />
              <button
                className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium"
                onClick={handleAddComment}
              >
                Add comment
              </button>
            </div>
          </section>
        </div>

        <div className="w-80 flex flex-col gap-6">
          <div>
            <div className="font-semibold text-gray-800 text-base mb-3 tracking-wide">
              Planning
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <label className="text-xs font-medium text-gray-600 min-w-[100px]">
                  Story Points
                </label>
                <InlineNumberEdit
                  value={Number(storyPoints) || 0}
                  onChange={(v) => setStoryPoints(String(v))}
                  min={0}
                  className="w-32"
                  inputClassName="border rounded px-2 py-1 w-24"
                  textClassName="cursor-pointer px-2 py-1 min-w-[96px]"
                />
              </div>
              <div className="flex items-center gap-3">
                <label className="text-xs font-medium text-gray-600 min-w-[100px]">
                  Priority
                </label>
                <InlineNumberEdit
                  value={Number(priority) || 0}
                  onChange={(v) => setPriority(String(v))}
                  min={0}
                  max={5}
                  className="w-32"
                  inputClassName="border rounded px-2 py-1 w-24"
                  textClassName="cursor-pointer px-2 py-1 min-w-[96px]"
                />
              </div>
              <div className="flex items-center gap-3">
                <label className="text-xs font-medium text-gray-600 min-w-[100px]">
                  Risk
                </label>
                <InlineNumberEdit
                  value={Number(risk) || 0}
                  onChange={(v) => setRisk(String(v))}
                  min={0}
                  max={5}
                  className="w-32"
                  inputClassName="border rounded px-2 py-1 w-24"
                  textClassName="cursor-pointer px-2 py-1 min-w-[96px]"
                />
              </div>
            </div>
          </div>

          <div>
            <div className="font-semibold text-gray-800 text-base mb-3 tracking-wide">
              Classification
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <label className="text-xs font-medium text-gray-600 min-w-[80px]">
                    Area
                  </label>
                  <InlineTextEdit
                    value={area}
                    onChange={setArea}
                    placeholder="Area"
                    inputClassName="border rounded px-2 py-1 w-56"
                    textClassName="cursor-pointer px-2 py-1 min-w-[224px]"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <label className="text-xs font-medium text-gray-600 min-w-[80px]">
                    Iteration
                  </label>
                  <InlineTextEdit
                    value={iteration}
                    onChange={setIteration}
                    placeholder="Iteration"
                    inputClassName="border rounded px-2 py-1 w-56"
                    textClassName="cursor-pointer px-2 py-1 min-w-[224px]"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <label className="text-xs font-medium text-gray-600 min-w-[80px]">
                    Value Area
                  </label>
                  <InlineTextEdit
                    value={valueArea}
                    onChange={setValueArea}
                    placeholder="Value Area"
                    inputClassName="border rounded px-2 py-1 w-56"
                    textClassName="cursor-pointer px-2 py-1 min-w-[224px]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
