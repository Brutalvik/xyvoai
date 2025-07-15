"use client";

import { Menu, Search, Eye, Filter, Trash2 } from "lucide-react";
import { useAppSelector } from "@/store/hooks";
import { isLoggedIn, selectUser } from "@/store/selectors";
import { useDisclosure } from "@heroui/react";
import { Avatar } from "@heroui/react";
import _ from "lodash";

import UserDrawer from "@/components/Navbar/UserDrawer";
import LanguageSwitch from "@/components/LanguageSwitch";
import { ThemeSwitch } from "@/components/theme-switch";
import { getBgColor, getInitial } from "@/utils";

export function BoardHeader({
  onToggleSidebar,
}: {
  onToggleSidebar: () => void;
}) {
  const drawerDisclosure = useDisclosure();
  const loggedIn = useAppSelector(isLoggedIn);
  const activeUser: any = useAppSelector(selectUser);
  const { user } = activeUser || {};

  const avatarBg = user?.id ? getBgColor(user.id) : "bg-gray-400";
  const avatarInitial = getInitial(user?.name || "");

  return (
    <>
      <header className="sticky top-0 z-30 w-full flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-neutral-700">
        {/* Left: Hamburger + Breadcrumb */}
        <div className="flex items-center gap-4">
          <button
            className="sm:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-neutral-700"
            onClick={onToggleSidebar}
          >
            <Menu size={20} />
          </button>
          <div className="text-sm font-medium">Project / Sprint / Board</div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-4">
          <button className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-neutral-700">
            <Search size={18} />
          </button>
          <button className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-neutral-700">
            <Eye size={18} />
          </button>
          <button className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-neutral-700">
            <Filter size={18} />
          </button>
          <button className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-neutral-700">
            <Trash2 size={18} />
          </button>
          {loggedIn && user && (
            <button onClick={drawerDisclosure.onOpen}>
              <Avatar
                name={avatarInitial}
                size="sm"
                src={user?.image}
                style={
                  user?.image
                    ? {}
                    : {
                        backgroundColor: getBgColor(user?.id || "", true),
                        fontSize: "0.975rem",
                        fontWeight: 700,
                        color: "#fff",
                      }
                }
                className="cursor-pointer"
              />
            </button>
          )}
        </div>
      </header>

      {loggedIn && (
        <UserDrawer
          isOpen={drawerDisclosure.isOpen}
          onOpenChange={drawerDisclosure.onOpenChange}
        />
      )}
    </>
  );
}
