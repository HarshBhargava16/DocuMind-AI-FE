"use client";

import { useState } from "react";
import {
  FileText,
  MessageSquare,
  Database,
  Sparkles,
  Upload,
  Plus,
  ArrowUpRight,
  Clock3,
  MoreHorizontal,
  CheckCircle2,
  LoaderCircle,
  TrendingUp,
  Search,
  Send,
  Paperclip,
  Zap,
  BookOpen,
  Quote,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

/* ----------------------------- Data ----------------------------- */

const stats = [
  {
    title: "Total Documents",
    value: "24",
    change: "+4 this week",
    icon: FileText,
    trend: [6, 9, 8, 12, 14, 13, 18],
    tint: "bg-blue-50 text-[#2563EB]",
    stroke: "#2563EB",
  },
  {
    title: "AI Conversations",
    value: "156",
    change: "+12 this week",
    icon: MessageSquare,
    trend: [10, 14, 12, 20, 17, 26, 30],
    tint: "bg-violet-50 text-violet-600",
    stroke: "#7C3AED",
  },
  {
    title: "Knowledge Bases",
    value: "08",
    change: "Across your workspace",
    icon: Database,
    trend: [4, 4, 5, 5, 6, 7, 8],
    tint: "bg-emerald-50 text-emerald-600",
    stroke: "#059669",
  },
  {
    title: "Processed Today",
    value: "12",
    change: "Documents processed",
    icon: Sparkles,
    trend: [3, 7, 5, 9, 6, 11, 12],
    tint: "bg-amber-50 text-amber-600",
    stroke: "#D97706",
  },
];

const chartData = {
  "7 days": {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    values: [18, 32, 26, 45, 38, 52, 47],
  },
  "30 days": {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    values: [120, 168, 150, 210],
  },
};

const knowledgeBases = [
  { name: "Product Documentation", docs: 9, indexed: 100, color: "bg-[#2563EB]" },
  { name: "Research Library", docs: 7, indexed: 82, color: "bg-violet-500" },
  { name: "Company Policies", docs: 5, indexed: 64, color: "bg-emerald-500" },
  { name: "Client Proposals", docs: 3, indexed: 35, color: "bg-amber-500" },
];

const documents = [
  { name: "Project Proposal.pdf", type: "PDF", size: "2.4 MB", date: "2 hours ago", status: "Completed", progress: 100 },
  { name: "Research Paper.pdf", type: "PDF", size: "1.8 MB", date: "Yesterday", status: "Completed", progress: 100 },
  { name: "Company Guidelines.docx", type: "DOCX", size: "840 KB", date: "2 days ago", status: "Processing", progress: 62 },
  { name: "Product Documentation.pdf", type: "PDF", size: "3.2 MB", date: "3 days ago", status: "Completed", progress: 100 },
];

const activities = [
  { title: "Document uploaded", description: "Project Proposal.pdf was uploaded", time: "2 hours ago", icon: Upload },
  { title: "AI conversation created", description: "You started a new conversation", time: "4 hours ago", icon: MessageSquare },
  { title: "Knowledge base updated", description: "Research documents were indexed", time: "Yesterday", icon: Database },
];

const suggestions = [
  "Summarize the Project Proposal",
  "What are the key risks in the Research Paper?",
  "Compare guidelines with product docs",
];

/* ----------------------------- Helpers ----------------------------- */

function buildPath(values, w, h, pad) {
  const max = Math.max(...values) * 1.15;
  const pts = values.map((v, i) => [
    pad + (i * (w - pad * 2)) / (values.length - 1),
    h - pad - (v / max) * (h - pad * 2),
  ]);

  let line = `M${pts[0][0]},${pts[0][1]}`;
  for (let i = 1; i < pts.length; i++) {
    const [px, py] = pts[i - 1];
    const [x, y] = pts[i];
    const cx = (px + x) / 2;
    line += ` C${cx},${py} ${cx},${y} ${x},${y}`;
  }

  const last = pts[pts.length - 1];
  const area = `${line} L${last[0]},${h - pad} L${pts[0][0]},${h - pad} Z`;
  return { line, area, pts };
}

function Sparkline({ data, stroke, id }) {
  const { line, area } = buildPath(data, 120, 40, 3);
  return (
    <svg viewBox="0 0 120 40" className="h-10 w-full" preserveAspectRatio="none" aria-hidden>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={stroke} stopOpacity="0.18" />
          <stop offset="100%" stopColor={stroke} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#${id})`} />
      <path d={line} fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/* ----------------------------- Page ----------------------------- */

export default function Dashboard() {
  const [range, setRange] = useState("7 days");
  const { labels, values } = chartData[range];
  const { line, area, pts } = buildPath(values, 640, 220, 24);
  const total = values.reduce((a, b) => a + b, 0);

  return (
    <div className="min-h-full space-y-6 bg-[#F8FAFC] p-5 md:p-8">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
            Good afternoon 👋
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Welcome back! Here's what's happening in your workspace.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
            <input
              placeholder="Search documents..."
              className="h-10 w-64 rounded-lg border border-slate-200 bg-white pl-9 pr-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
            />
          </div>
          <Button className="bg-[#2563EB] hover:bg-[#1D4ED8]">
            <Plus className="mr-2 size-4" />
            New Document
          </Button>
        </div>
      </div>

      {/* Hero: AI assistant + usage */}
      <div className="grid gap-5 xl:grid-cols-3">
        <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-[#2563EB] via-[#2563EB] to-[#1D4ED8] shadow-lg shadow-blue-600/20 xl:col-span-2">
          <div className="pointer-events-none absolute -right-16 -top-16 size-64 rounded-full bg-white/10 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-24 left-1/3 size-72 rounded-full bg-blue-300/20 blur-3xl" />

          <CardContent className="relative p-6 md:p-8">
            <div className="flex items-center gap-2">
              <div className="flex size-9 items-center justify-center rounded-lg bg-white/15 backdrop-blur">
                <Sparkles className="size-5 text-white" />
              </div>
              <span className="text-sm font-medium text-blue-100">AI Knowledge Assistant</span>
            </div>

            <h2 className="mt-5 max-w-lg text-2xl font-semibold leading-snug tracking-tight text-white md:text-3xl">
              Ask anything about your 24 documents
            </h2>
            <p className="mt-2 max-w-lg text-sm text-blue-100">
              Get answers with sources from your own files, indexed and ready to use.
            </p>

            <div className="mt-6 flex items-center gap-2 rounded-xl bg-white p-2 shadow-xl shadow-blue-900/20">
              <button className="flex size-9 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-600">
                <Paperclip className="size-4" />
              </button>
              <input
                placeholder="Ask a question about your documents..."
                className="h-9 min-w-0 flex-1 bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
              />
              <Button size="sm" className="bg-[#2563EB] hover:bg-[#1D4ED8]">
                <Send className="mr-1.5 size-3.5" />
                Ask AI
              </Button>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {suggestions.map((s) => (
                <button
                  key={s}
                  className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs text-white transition hover:bg-white/20"
                >
                  {s}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* AI usage ring */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">AI usage</CardTitle>
            <CardDescription>Monthly token allowance.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center pt-2">
            <div className="relative size-36">
              <svg viewBox="0 0 120 120" className="size-full -rotate-90">
                <circle cx="60" cy="60" r="52" fill="none" stroke="#EFF6FF" strokeWidth="10" />
                <circle
                  cx="60"
                  cy="60"
                  r="52"
                  fill="none"
                  stroke="#2563EB"
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray={`${0.68 * 2 * Math.PI * 52} ${2 * Math.PI * 52}`}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-semibold tracking-tight text-slate-900">68%</span>
                <span className="text-xs text-slate-500">used</span>
              </div>
            </div>

            <p className="mt-4 text-sm font-medium text-slate-800">680K of 1M tokens</p>
            <p className="mt-1 flex items-center gap-1 text-xs text-slate-500">
              <Clock3 className="size-3" />
              Resets in 11 days
            </p>

            <Button variant="outline" className="mt-5 w-full border-slate-200 text-slate-600">
              <Zap className="mr-2 size-4 text-[#2563EB]" />
              Upgrade plan
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Stats with sparklines */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="border-slate-200 shadow-sm">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-slate-500">{stat.title}</p>
                  <div className={`flex size-10 items-center justify-center rounded-lg ${stat.tint}`}>
                    <Icon className="size-5" />
                  </div>
                </div>

                <div className="mt-3 flex items-end justify-between gap-4">
                  <div>
                    <h2 className="text-3xl font-semibold tracking-tight text-slate-900">
                      {stat.value}
                    </h2>
                    <p className="mt-1 text-xs text-slate-500">{stat.change}</p>
                  </div>
                  <div className="w-24 shrink-0">
                    <Sparkline data={stat.trend} stroke={stat.stroke} id={`spark-${i}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Chart + Knowledge bases */}
      <div className="grid gap-5 xl:grid-cols-3">
        <Card className="border-slate-200 shadow-sm xl:col-span-2">
          <CardHeader className="flex flex-row items-start justify-between space-y-0">
            <div>
              <CardTitle className="text-base font-semibold">AI conversations</CardTitle>
              <CardDescription className="mt-1">
                Questions asked across your workspace.
              </CardDescription>
            </div>

            <div className="flex rounded-lg bg-slate-100 p-1">
              {Object.keys(chartData).map((r) => (
                <button
                  key={r}
                  onClick={() => setRange(r)}
                  className={`rounded-md px-3 py-1 text-xs font-medium transition ${
                    range === r
                      ? "bg-white text-[#2563EB] shadow-sm"
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </CardHeader>

          <CardContent>
            <div className="mb-4 flex items-baseline gap-3">
              <span className="text-3xl font-semibold tracking-tight text-slate-900">{total}</span>
              <Badge className="border-0 bg-emerald-50 text-emerald-700 hover:bg-emerald-50">
                <TrendingUp className="mr-1 size-3" />
                +18%
              </Badge>
              <span className="text-xs text-slate-500">vs previous period</span>
            </div>

            <svg viewBox="0 0 640 220" className="h-56 w-full" role="img" aria-label="Conversations over time">
              <defs>
                <linearGradient id="area-fill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2563EB" stopOpacity="0.22" />
                  <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
                </linearGradient>
              </defs>

              {[0.25, 0.5, 0.75].map((g) => (
                <line
                  key={g}
                  x1="24"
                  x2="616"
                  y1={24 + g * 172}
                  y2={24 + g * 172}
                  stroke="#E2E8F0"
                  strokeDasharray="4 6"
                />
              ))}

              <path d={area} fill="url(#area-fill)" />
              <path d={line} fill="none" stroke="#2563EB" strokeWidth="3" strokeLinecap="round" />

              {pts.map(([x, y], i) => (
                <circle key={i} cx={x} cy={y} r="4.5" fill="#fff" stroke="#2563EB" strokeWidth="2.5" />
              ))}
            </svg>

            <div className="mt-2 flex justify-between px-1 text-xs text-slate-400">
              {labels.map((l) => (
                <span key={l}>{l}</span>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle className="text-base font-semibold">Knowledge bases</CardTitle>
              <CardDescription className="mt-1">Indexing progress.</CardDescription>
            </div>
            <Button variant="ghost" size="sm" className="text-[#2563EB]">
              Manage
            </Button>
          </CardHeader>

          <CardContent className="space-y-5">
            {knowledgeBases.map((kb) => (
              <div key={kb.name}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BookOpen className="size-4 text-slate-400" />
                    <p className="text-sm font-medium text-slate-800">{kb.name}</p>
                  </div>
                  <span className="text-xs text-slate-500">{kb.docs} docs</span>
                </div>

                <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className={`h-full rounded-full ${kb.color}`}
                    style={{ width: `${kb.indexed}%` }}
                  />
                </div>
                <p className="mt-1.5 text-xs text-slate-400">{kb.indexed}% indexed</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Recent documents + AI answer preview */}
      <div className="grid gap-5 xl:grid-cols-3">
        <Card className="border-slate-200 shadow-sm xl:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle className="text-base font-semibold">Recent Documents</CardTitle>
              <CardDescription className="mt-1">Your recently uploaded documents.</CardDescription>
            </div>
            <Button variant="ghost" size="sm" className="text-[#2563EB]">
              View all
              <ArrowUpRight className="ml-1 size-4" />
            </Button>
          </CardHeader>

          <CardContent>
            <div className="space-y-1">
              {documents.map((doc) => (
                <div
                  key={doc.name}
                  className="flex flex-col gap-3 rounded-lg p-3 transition hover:bg-slate-50 sm:flex-row sm:items-center"
                >
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-blue-50">
                    <FileText className="size-5 text-[#2563EB]" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-slate-800">{doc.name}</p>
                    <p className="mt-1 text-xs text-slate-500">
                      {doc.type} · {doc.size} · {doc.date}
                    </p>
                    {doc.status === "Processing" && (
                      <div className="mt-2 h-1.5 w-full max-w-[220px] overflow-hidden rounded-full bg-amber-100">
                        <div
                          className="h-full rounded-full bg-amber-500"
                          style={{ width: `${doc.progress}%` }}
                        />
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    {doc.status === "Completed" ? (
                      <Badge className="border-0 bg-emerald-50 text-emerald-700 hover:bg-emerald-50">
                        <CheckCircle2 className="mr-1 size-3" />
                        Completed
                      </Badge>
                    ) : (
                      <Badge className="border-0 bg-amber-50 text-amber-700 hover:bg-amber-50">
                        <LoaderCircle className="mr-1 size-3 animate-spin" />
                        Processing
                      </Badge>
                    )}
                    <Button variant="ghost" size="icon" className="size-8">
                      <MoreHorizontal className="size-4 text-slate-500" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Latest AI answer with sources */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Latest answer</CardTitle>
            <CardDescription>From your last conversation.</CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="ml-auto w-fit max-w-[90%] rounded-2xl rounded-br-sm bg-[#2563EB] px-4 py-2.5 text-sm text-white">
              What's the project timeline?
            </div>

            <div className="flex gap-2.5">
              <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-blue-50">
                <Sparkles className="size-4 text-[#2563EB]" />
              </div>
              <div className="rounded-2xl rounded-tl-sm bg-slate-50 px-4 py-3 text-sm leading-relaxed text-slate-700">
                The project runs in three phases over 12 weeks, with the launch planned for week 12.
              </div>
            </div>

            <div className="space-y-2 pl-10">
              <p className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                <Quote className="size-3" />
                Sources
              </p>
              {["Project Proposal.pdf · p. 4", "Research Paper.pdf · p. 11"].map((s) => (
                <div
                  key={s}
                  className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-600 transition hover:border-blue-300"
                >
                  <FileText className="size-3.5 text-[#2563EB]" />
                  {s}
                </div>
              ))}
            </div>

            <Button variant="outline" className="w-full border-slate-200 text-slate-600">
              Continue conversation
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick actions + Activity */}
      <div className="grid gap-5 xl:grid-cols-3">
        <div className="grid gap-4 sm:grid-cols-3 xl:col-span-2">
          {[
            { title: "Upload Document", text: "Add documents to your workspace.", icon: Upload, bg: "bg-blue-50", fg: "text-[#2563EB]" },
            { title: "Chat with AI", text: "Ask questions about your documents.", icon: MessageSquare, bg: "bg-violet-50", fg: "text-violet-600" },
            { title: "Knowledge Base", text: "Organize your document knowledge.", icon: Database, bg: "bg-emerald-50", fg: "text-emerald-600" },
          ].map((a) => {
            const Icon = a.icon;
            return (
              <Card
                key={a.title}
                className="group cursor-pointer border-slate-200 shadow-sm transition-all hover:-translate-y-1 hover:border-blue-300 hover:shadow-md"
              >
                <CardContent className="flex h-full flex-col p-5">
                  <div className="flex items-start justify-between">
                    <div className={`flex size-12 items-center justify-center rounded-xl ${a.bg}`}>
                      <Icon className={`size-6 ${a.fg}`} />
                    </div>
                    <ArrowUpRight className="size-4 text-slate-400 transition group-hover:text-[#2563EB]" />
                  </div>
                  <h3 className="mt-4 text-sm font-semibold text-slate-900">{a.title}</h3>
                  <p className="mt-1 text-xs text-slate-500">{a.text}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Recent Activity</CardTitle>
            <CardDescription>Your latest workspace activity.</CardDescription>
          </CardHeader>

          <CardContent>
            <div className="relative space-y-6">
              <div className="absolute bottom-2 left-[17px] top-2 w-px bg-slate-200" />
              {activities.map((activity, index) => {
                const Icon = activity.icon;
                return (
                  <div key={index} className="relative flex gap-3">
                    <div className="z-10 flex size-9 shrink-0 items-center justify-center rounded-full border-4 border-white bg-blue-50">
                      <Icon className="size-4 text-[#2563EB]" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-slate-800">{activity.title}</p>
                      <p className="mt-1 text-xs leading-relaxed text-slate-500">
                        {activity.description}
                      </p>
                      <p className="mt-2 flex items-center gap-1 text-xs text-slate-400">
                        <Clock3 className="size-3" />
                        {activity.time}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <Button variant="outline" className="mt-6 w-full border-slate-200 text-slate-600">
              View Activity
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}