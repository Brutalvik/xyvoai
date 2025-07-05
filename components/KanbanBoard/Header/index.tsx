"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { NavigationBreadcrumbs } from "@/components/KanbanBoard/NavigationBreadcrumbs";

const Header = () => {
  const t = useTranslations("Header");
  const [searchOpen, setSearchOpen] = useState(false);

  const toggleSearch = () => setSearchOpen((prev) => !prev);

  return (
    <header className="px-6 py-4 shadow-sm flex items-center justify-between border-b">
      <div className="flex flex-col">
        <NavigationBreadcrumbs />

        <h1 className="text-xl font-bold">{t("boardTitle")}</h1>
      </div>

      <div className="flex items-center space-x-4">
        <div
          className={`transition-all duration-300 ease-in-out border rounded flex items-center bg-gray-100 overflow-hidden ${
            searchOpen ? "w-64" : "w-8"
          }`}
        >
          <input
            type="text"
            placeholder={t("searchPlaceholder")}
            className={`bg-transparent outline-none px-2 w-full ${
              searchOpen ? "block" : "hidden"
            }`}
            autoFocus={searchOpen}
          />
          <span
            onClick={toggleSearch}
            className="material-icons cursor-pointer px-2"
          >
            search
          </span>
        </div>

        <span
          className="material-icons cursor-pointer"
          onClick={() => alert("Filters clicked")}
        >
          filter_list
        </span>
        <span
          className="material-icons cursor-pointer"
          onClick={() => alert("View toggled")}
        >
          view_agenda
        </span>
        <span
          className="material-icons cursor-pointer"
          onClick={() => alert("Delete clicked")}
        >
          delete
        </span>
      </div>
    </header>
  );
};

export default Header;
