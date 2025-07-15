import React, { useState, useRef, useEffect } from "react";

interface InlineNumberEditProps {
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  className?: string;
  inputClassName?: string;
  textClassName?: string;
  disabled?: boolean;
}

/**
 * Reusable inline-editable number field. Shows a number as text; clicking it turns it into an input.
 * On blur or Enter, input saves and returns to text mode.
 */
const InlineNumberEdit: React.FC<InlineNumberEditProps> = ({
  value,
  onChange,
  min,
  max,
  className = "",
  inputClassName = "border rounded px-2 py-1 w-16",
  textClassName = "cursor-pointer px-2 py-1",
  disabled = false,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState<number>(value);
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
    <>
      <style>{`
        input[type=number]::-webkit-inner-spin-button, input[type=number]::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        input[type=number] {
          -moz-appearance: textfield;
        }
      `}</style>
      <span className={className}>
      {isEditing && !disabled ? (
        <input
          ref={inputRef}
          type="number"
          value={inputValue}
          min={min}
          max={max}
          onChange={e => setInputValue(Number(e.target.value))}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className={inputClassName}
          disabled={disabled}
          style={{
            MozAppearance: 'textfield',
            appearance: 'textfield',
            WebkitAppearance: 'none',
            margin: 0
          }}
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
          aria-label="Edit number"
        >
          {value}
        </span>
      )}
    </span>
    </>
  );
};

export default InlineNumberEdit;
