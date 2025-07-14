"use client";

import React from "react";
import { DateRangePicker } from "@heroui/react";
import { today, getLocalTimeZone, CalendarDate } from "@internationalized/date";

type Props = {
  value: { start: CalendarDate; end: CalendarDate };
  onChange: (val: { start: CalendarDate; end: CalendarDate }) => void;
};

export default function SprintDateRangePicker({ value, onChange }: Props) {
  const min = today(getLocalTimeZone());

  return (
    <DateRangePicker
      className="max-w-md"
      label="Sprint Duration"
      minValue={min}
      value={value}
      variant="bordered"
      onChange={(val) => {
        if (val?.start && val?.end) {
          onChange(val);
        }
      }}
    />
  );
}
