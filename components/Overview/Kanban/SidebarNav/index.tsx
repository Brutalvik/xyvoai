// components/kanban/SidebarNav.tsx
"use client";

import { Home, List, KanbanSquare, Settings, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: Home, href: "/dashboard", label: "Home" },
  { icon: KanbanSquare, href: "/board", label: "Boards" },
  { icon: List, href: "/backlogs", label: "Backlogs" },
  { icon: Settings, href: "/settings", label: "Settings" },
];

export function SidebarNav({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-40 w-64 transform transition-transform duration-300 ease-in-out bg-white dark:bg-neutral-800 border-r border-gray-200 dark:border-neutral-700",
        isOpen ? "translate-x-0" : "-translate-x-full",
        "sm:translate-x-0 sm:relative sm:w-16 sm:flex sm:flex-col sm:items-center sm:py-4 sm:space-y-4 sm:bg-white sm:dark:bg-neutral-800"
      )}
    >
      <div className="flex items-center justify-between p-4 sm:hidden">
        <span className="text-lg font-semibold">Navigation</span>
        <button onClick={onClose}>
          <X size={20} />
        </button>
      </div>

      <nav className="flex flex-col sm:items-center gap-4 px-4 sm:px-0">
        {navItems.map(({ icon: Icon, href, label }) => (
          <Link key={href} href={href} passHref>
            <div
              className={cn(
                "flex items-center gap-2 sm:gap-0 sm:flex-col sm:p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-700 cursor-pointer transition",
                pathname === href && "bg-gray-100 dark:bg-neutral-700"
              )}
            >
              <Icon size={20} />
              <span className="sm:hidden text-sm">{label}</span>
            </div>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
