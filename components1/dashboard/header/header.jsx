
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Files,
  MessageSquare,
  Database,
  Search,
  Bell,
} from "lucide-react";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

const QUICK_NAV = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Documents",
    href: "/documents",
    icon: Files,
  },
  {
    label: "AI Assistant",
    href: "/chat",
    icon: MessageSquare,
  },
  {
    label: "Knowledge Base",
    href: "/knowledge-base",
    icon: Database,
  },
];

export function Header() {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden sticky top-0 z-40 h-14 bg-slate-950 border-b border-white/10 flex items-center px-3 shrink-0 shadow-lg">
        <SidebarTrigger className="text-white/55 hover:text-white hover:bg-white/10 rounded-lg w-9 h-9 transition-all shrink-0" />

        <Link
          href="/dashboard"
          className="flex-1 flex items-center justify-center gap-2"
        >
          <div className="flex size-8 items-center justify-center rounded-lg bg-white/10 text-white font-bold">
            D
          </div>

          <span className="text-sm font-semibold text-white">
            DocuMind AI
          </span>
        </Link>

        <div className="flex items-center gap-1 shrink-0">
          <button
            type="button"
            title="Search"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-white/55 hover:bg-white/10 hover:text-white transition-all"
          >
            <Search size={16} />
          </button>

          <button
            type="button"
            title="Notifications"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-white/55 hover:bg-white/10 hover:text-white transition-all"
          >
            <Bell size={16} />
          </button>
        </div>
      </div>

      {/* Desktop Header */}
      <div className="hidden lg:flex items-center gap-1 px-3 py-2 border-b border-gray-100 sticky top-0 z-30 bg-white/90 backdrop-blur-sm shrink-0">
        <SidebarTrigger className="h-8 w-8 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-all shrink-0" />

        <div className="h-4 w-px bg-gray-200 mx-2 shrink-0" />

        {QUICK_NAV.map(({ label, href, icon: Icon }) => {
          const isActive =
            pathname === href ||
            pathname.startsWith(href + "/");

          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150",
                isActive
                  ? "bg-gray-900 text-white shadow-sm"
                  : "text-gray-500 hover:text-gray-800 hover:bg-gray-100"
              )}
            >
              <Icon size={13} className="shrink-0" />
              {label}
            </Link>
          );
        })}

        <div className="ml-auto flex items-center gap-1">
          <button
            type="button"
            title="Quick search"
            className="flex h-8 items-center gap-2 rounded-lg border border-gray-200 pl-2.5 pr-2 text-xs text-gray-400 transition-all hover:border-gray-300 hover:bg-gray-100 hover:text-gray-700"
          >
            <Search size={13} />
            <span className="hidden xl:inline">
              Quick search…
            </span>
            <kbd className="hidden xl:inline-flex items-center rounded border border-gray-200 bg-gray-50 px-1.5 py-0.5 text-[10px] font-medium text-gray-500">
              Ctrl K
            </kbd>
          </button>

          <div className="h-4 w-px bg-gray-200 mx-1 shrink-0" />

          <button
            type="button"
            title="Notifications"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-all"
          >
            <Bell size={15} />
          </button>
        </div>
      </div>
    </>
  );
}
