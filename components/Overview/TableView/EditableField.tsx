"use client";

import React, { useState, useRef, useEffect } from "react";

interface EditableFieldProps {
  value: string;
  onSave: (newValue: string) => void;
  required?: boolean;
  multiline?: boolean;
}

export const EditableField: React.FC<EditableFieldProps> = ({
  value,
  onSave,
  required = false,
  multiline = false,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  const handleSave = () => {
    if (required && !inputValue.trim()) return;
    if (inputValue !== value) {
      onSave(inputValue.trim());
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setInputValue(value);
    setIsEditing(false);
  };

  if (isEditing) {
    return multiline ? (
      <textarea
        ref={inputRef as React.RefObject<HTMLTextAreaElement>}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onBlur={handleSave}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) handleSave();
          if (e.key === "Escape") handleCancel();
        }}
        className="w-full p-1 border rounded text-sm"
        rows={2}
      />
    ) : (
      <input
        ref={inputRef as React.RefObject<HTMLInputElement>}
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onBlur={handleSave}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSave();
          if (e.key === "Escape") handleCancel();
        }}
        className="w-full p-1 border rounded text-sm"
      />
    );
  }

  return (
    <div
      className="cursor-text"
      onClick={() => setIsEditing(true)}
      title="Click to edit"
    >
      {value || <span className="text-gray-400">—</span>}
    </div>
  );
};
