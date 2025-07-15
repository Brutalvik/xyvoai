import React from "react";

interface BacklogHeaderProps {
  title: string;
  tags: string[];
  onTitleChange: (value: string) => void;
  onTagsChange: (tags: string[]) => void;
  saving: boolean;
  saved: boolean;
  onSave: () => void;
}

const BacklogHeader: React.FC<BacklogHeaderProps> = ({
  title,
  tags,
  onTitleChange,
  onTagsChange,
  saving,
  saved,
  onSave,
}) => {
  // TagPopover and tag logic omitted for brevity; insert as needed
  return (
    <header className="sticky top-0 z-20 bg-white border-b border-gray-200 shadow-sm flex items-center gap-3 px-8 py-4">
      <span className="material-icons text-blue-500 text-2xl">assignment</span>
      <input
        className="text-xl font-semibold bg-transparent outline-none border-none focus:ring-2 focus:ring-blue-200 focus:bg-blue-50 transition min-w-[200px]"
        placeholder="Title"
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
      />
      <span className="ml-2 px-2 py-1 rounded bg-blue-50 text-blue-700 text-xs font-semibold">Backlog</span>
      {/* Tag management UI here */}
      <div className="flex-1" />
      <button
        className={`relative bg-blue-600 hover:bg-blue-700 transition text-white px-5 py-2 rounded font-semibold shadow-sm flex items-center gap-2 ${saving ? "opacity-60 pointer-events-none" : ""}`}
        onClick={onSave}
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
  );
};

export default BacklogHeader;
