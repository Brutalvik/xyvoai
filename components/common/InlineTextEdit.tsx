import React, { useState, useRef, useEffect } from "react";

interface InlineTextEditProps {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  className?: string;
  inputClassName?: string;
  textClassName?: string;
  disabled?: boolean;
}

/**
 * Reusable inline-editable text field. Shows text as a span; clicking it turns it into an input.
 * On blur or Enter, input saves and returns to text mode.
 */
const InlineTextEdit: React.FC<InlineTextEditProps> = ({
  value,
  onChange,
  placeholder = "",
  className = "",
  inputClassName = "border rounded px-2 py-1 w-full",
  textClassName = "cursor-pointer px-2 py-1",
  disabled = false,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState<string>(value);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) inputRef.current?.focus();
  }, [isEditing]);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleBlur = () => {
    setIsEditing(false);
    if (inputValue !== value) onChange(inputValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setIsEditing(false);
      if (inputValue !== value) onChange(inputValue);
    } else if (e.key === "Escape") {
      setIsEditing(false);
      setInputValue(value); // revert
    }
  };

  return (
    <span className={className}>
      {isEditing && !disabled ? (
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          placeholder={placeholder}
          onChange={e => setInputValue(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className={inputClassName}
          disabled={disabled}
        />
      ) : (
        <span
          className={textClassName + (disabled ? " text-gray-400" : "")}
          onClick={() => !disabled && setIsEditing(true)}
          tabIndex={disabled ? -1 : 0}
          onKeyDown={e => {
            if (!disabled && (e.key === "Enter" || e.key === " ")) setIsEditing(true);
          }}
          role="button"
          aria-label="Edit text"
        >
          {value || <span className="text-gray-400">{placeholder}</span>}
        </span>
      )}
    </span>
  );
};

export default InlineTextEdit;
