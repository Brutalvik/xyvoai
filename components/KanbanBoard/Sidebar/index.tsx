"use client";

import React from "react";
import { useTranslations } from "next-intl";

const Sidebar = () => {
  const t = useTranslations("Sidebar");

  return (
    <aside className="w-64 bg-white border-r shadow-sm flex flex-col">
      <div className="flex items-center px-4 py-4 text-blue-600 font-bold border-b">
        <span className="material-icons mr-2">layers</span>
        {t("projectBoard")}
      </div>

      <div className="px-4 py-3 text-sm font-semibold text-gray-700 border-b">
        <div className="bg-green-100 text-green-800 px-2 py-1 rounded inline-block">
          AW
        </div>
        <span className="ml-2">{t("projectName")}</span>
      </div>

      <nav className="flex-1 overflow-auto text-sm">
        <ul className="mt-2 space-y-1">
          <li>
            <a
              href="#"
              className="flex items-center px-4 py-2 hover:bg-gray-100"
            >
              <span className="material-icons mr-3 text-blue-500">
                dashboard
              </span>
              {t("overview")}
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center px-4 py-2 bg-gray-200 font-semibold text-gray-900"
            >
              <span className="material-icons mr-3 text-green-500">
                view_kanban
              </span>
              {t("boards")}
            </a>
            <ul className="ml-10 mt-1 space-y-1">
              <li>
                <a href="#" className="block py-1 text-gray-600">
                  {t("workItems")}
                </a>
              </li>
              <li>
                <a href="#" className="block py-1 font-semibold text-blue-600">
                  {t("boards")}
                </a>
              </li>
              <li>
                <a href="#" className="block py-1 text-gray-600">
                  {t("backlogs")}
                </a>
              </li>
              <li>
                <a href="#" className="block py-1 text-gray-600">
                  {t("sprints")}
                </a>
              </li>
              <li>
                <a href="#" className="block py-1 text-gray-600">
                  {t("queries")}
                </a>
              </li>
              <li>
                <a href="#" className="block py-1 text-gray-600">
                  {t("plans")}
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center px-4 py-2 hover:bg-gray-100"
            >
              <span className="material-icons mr-3 text-red-500">code</span>
              {t("repos")}
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center px-4 py-2 hover:bg-gray-100"
            >
              <span className="material-icons mr-3 text-blue-600">build</span>
              {t("pipelines")}
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center px-4 py-2 hover:bg-gray-100"
            >
              <span className="material-icons mr-3 text-purple-600">
                science
              </span>
              {t("testPlans")}
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center px-4 py-2 hover:bg-gray-100"
            >
              <span className="material-icons mr-3 text-pink-600">
                inventory_2
              </span>
              {t("artifacts")}
            </a>
          </li>
        </ul>
      </nav>

      <div className="p-4 border-t text-xs text-gray-400">
        {t("projectSettings")}
      </div>
    </aside>
  );
};

export default Sidebar;
