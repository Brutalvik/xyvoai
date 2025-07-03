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
      label="Sprint Duration"
      className="max-w-md"
      variant="bordered"
      value={value}
      minValue={min}
      onChange={(val) => {
        if (val?.start && val?.end) {
          onChange(val);
        }
      }}
    />
  );
}
