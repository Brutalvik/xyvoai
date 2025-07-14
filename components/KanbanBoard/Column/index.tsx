"use client";

import React from "react";
import { useTranslations } from "next-intl";

type ColumnProps = {
  id: string;
  title: string;
  countLabel: string;
  countColor: string;
  children?: React.ReactNode;
};

const Column = ({
  id,
  title,
  countLabel,
  countColor,
  children,
}: ColumnProps) => {
  const t = useTranslations("Board");

  return (
    <div className="flex flex-col min-h-[500px] bg-white/90 rounded-2xl shadow-lg border border-gray-100 px-4 pt-4 pb-6 transition-all duration-200 hover:shadow-2xl hover:border-blue-200">
      {/* Column Header */}
      <div className="flex justify-between items-center mb-4 px-1">
        <h2 className="font-semibold text-lg text-gray-800 tracking-tight capitalize">
          {t(title)}
        </h2>
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${countColor} bg-gray-50 border border-gray-200`}>{countLabel}</span>
      </div>
      {/* Card Drop Area */}
      <div
        id={id}
        className="rounded-xl bg-gray-50 border border-dashed border-gray-200 p-2 space-y-4 flex-1 min-h-[300px] transition-all duration-200"
        data-column
      >
        {children}
      </div>
    </div>
  );
};

export default Column;
