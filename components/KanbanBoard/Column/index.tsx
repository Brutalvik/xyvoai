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
    <div className="flex flex-col min-h-[500px]">
      <div className="flex justify-between items-center mb-2">
        <h2 className="font-semibold text-lg">{t(title)}</h2>
        <span className={`text-sm ${countColor}`}>{countLabel}</span>
      </div>
      <div id={id} className="rounded shadow p-3 space-y-3 flex-1" data-column>
        {children}
      </div>
    </div>
  );
};

export default Column;
