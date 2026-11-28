import {
  LayoutDashboard,
  MessageSquare,
  Files,
  Database,
  Settings,
  Users,
  Sparkles,
} from "lucide-react";

export const SIDEBAR_MENU = [
  {
    title: "Workspace",
    items: [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboard,
      },
      {
        title: "AI Assistant",
        url: "/chat",
        icon: MessageSquare,
      },
      {
        title: "Documents",
        url: "/documents",
        icon: Files,
      },
      {
        title: "Knowledge Base",
        url: "/knowledge-base",
        icon: Database,
      },
    ],
  },
  {
    title: "Management",
    items: [
      {
        title: "Team Members",
        url: "/team",
        icon: Users,
      },
      {
        title: "AI Agents",
        url: "/agents",
        icon: Sparkles,
      },
      {
        title: "Settings",
        url: "/settings",
        icon: Settings,
      },
    ],
  },
];