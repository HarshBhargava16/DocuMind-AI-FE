"use client";

import Link from "next/link";
import {
  FileText,
  UploadCloud,
  BrainCircuit,
  MessageSquareText,
  FileSearch,
  Layers3,
  ShieldCheck,
  History,
  GitCompareArrows,
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Search,
  Server,
  FolderOpen,
  Clock3,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useSession } from "next-auth/react";

/* ----------------------------- Data ----------------------------- */

const trust = [
  { icon: FileText, label: "PDF documents" },
  { icon: FileSearch, label: "Page-level references" },
  { icon: BrainCircuit, label: "RAG-powered answers" },
  { icon: ShieldCheck, label: "Personal workspace" },
];

const steps = [
  {
    number: "01",
    icon: UploadCloud,
    title: "Upload Documents",
    description:
      "Upload your PDF documents and keep them organized in your personal workspace.",
  },
  {
    number: "02",
    icon: BrainCircuit,
    title: "AI Understands",
    description:
      "DocuMind processes document content and retrieves relevant information using RAG.",
  },
  {
    number: "03",
    icon: MessageSquareText,
    title: "Ask Anything",
    description:
      "Ask questions, generate summaries, and explore your documents through AI.",
  },
];

const techGroups = [
  {
    icon: Layers3,
    title: "Frontend",
    description: "Fast, accessible interface.",
    items: ["Next.js", "React.js", "Tailwind CSS", "shadcn/ui"],
  },
  {
    icon: Server,
    title: "Backend",
    description: "APIs and data storage.",
    items: ["Node.js", "Express.js", "MongoDB"],
  },
  {
    icon: BrainCircuit,
    title: "AI pipeline",
    description: "Retrieval and generation.",
    items: ["Python", "FastAPI", "LangChain", "LangGraph", "RAG"],
  },
];

const faqs = [
  {
    question: "What is DocuMind AI?",
    answer:
      "DocuMind AI is an AI-powered document management and question-answering platform that helps users understand and interact with their PDF documents.",
  },
  {
    question: "How does document question answering work?",
    answer:
      "DocuMind uses Retrieval-Augmented Generation (RAG). It retrieves relevant document passages and uses them as context to generate answers to your questions.",
  },
  {
    question: "Can I ask questions in natural language?",
    answer:
      "Yes. You can ask questions using everyday language instead of manually searching through lengthy documents.",
  },
  {
    question: "Can I summarize and compare documents?",
    answer:
      "Yes. DocuMind is designed to help users generate document summaries and compare multiple documents to understand their similarities and differences.",
  },
  {
    question: "Can I revisit previous conversations?",
    answer:
      "Yes. The platform includes chat history so you can revisit previous document-related conversations.",
  },
];

/* ----------------------------- Pieces ----------------------------- */

function Logo({ small = false }) {
  return (
    <Link href="/" className="flex items-center gap-2.5">
      <div
        className={`flex items-center justify-center rounded-lg bg-[#2563EB] text-white shadow-sm shadow-blue-600/30 ${
          small ? "size-8" : "size-9"
        }`}
      >
        <FileText size={small ? 17 : 21} />
      </div>
      <span
        className={`font-bold tracking-tight text-[#111827] ${
          small ? "text-lg" : "text-xl"
        }`}
      >
        DocuMind <span className="text-[#2563EB]">AI</span>
      </span>
    </Link>
  );
}

function SectionHeading({ badge, title, description, center = true }) {
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <Badge
        variant="outline"
        className="mb-4 border-blue-200 bg-blue-50 text-[#2563EB]"
      >
        {badge}
      </Badge>
      <h2 className="text-3xl font-bold tracking-tight text-[#111827] sm:text-4xl">
        {title}
      </h2>
      <p className="mt-4 leading-7 text-[#64748B]">{description}</p>
    </div>
  );
}

function BentoCard({ icon: Icon, title, description, className = "", children }) {
  return (
    <div
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white p-7 transition hover:border-blue-200 hover:shadow-lg hover:shadow-blue-900/5 ${className}`}
    >
      <div className="mb-4 inline-flex w-fit rounded-xl bg-blue-50 p-2.5 text-[#2563EB] transition group-hover:bg-[#2563EB] group-hover:text-white">
        <Icon size={22} />
      </div>
      <h3 className="text-lg font-semibold text-[#111827]">{title}</h3>
      <p className="mt-2 max-w-md text-sm leading-7 text-[#64748B]">
        {description}
      </p>
      {children && <div className="mt-6 flex-1">{children}</div>}
    </div>
  );
}

/* ----------------------------- Mini UI visuals ----------------------------- */

function ChatVisual() {
  return (
    <div className="space-y-3 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-4">
      <div className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-sm bg-[#2563EB] px-3.5 py-2 text-xs text-white">
        Summarize the payment terms in this contract
      </div>
      <div className="flex gap-2">
        <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-blue-50 text-[#2563EB]">
          <Sparkles size={13} />
        </div>
        <div className="rounded-2xl rounded-tl-sm border border-[#E2E8F0] bg-white px-3.5 py-2 text-xs leading-6 text-[#475569]">
          Payment is due within 30 days of the invoice date. Late payments may
          include an additional fee after that period.
        </div>
      </div>
    </div>
  );
}

function ReferencesVisual() {
  const refs = [
    { file: "Business_Proposal.pdf", page: "Page 3" },
    { file: "Research_Paper.pdf", page: "Page 12" },
    { file: "Guidelines.pdf", page: "Page 27" },
  ];
  return (
    <div className="space-y-2">
      {refs.map((r) => (
        <div
          key={r.file}
          className="flex items-center gap-2 rounded-lg border border-blue-100 bg-blue-50/60 px-3 py-2 text-xs"
        >
          <FileSearch size={14} className="shrink-0 text-[#2563EB]" />
          <span className="min-w-0 flex-1 truncate text-[#475569]">{r.file}</span>
          <span className="font-semibold text-[#2563EB]">{r.page}</span>
        </div>
      ))}
    </div>
  );
}

function SummaryVisual() {
  const points = [
    "Growth targets set for next quarter",
    "Costs reduced through automation",
    "Customer retention is the top priority",
  ];
  return (
    <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-4">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-xs font-semibold text-[#111827]">Key points</span>
        <Badge className="border-0 bg-emerald-50 text-emerald-700 hover:bg-emerald-50">
          Summary ready
        </Badge>
      </div>
      <ul className="space-y-2">
        {points.map((p) => (
          <li key={p} className="flex items-start gap-2 text-xs text-[#475569]">
            <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-[#16A34A]" />
            {p}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ComparisonVisual() {
  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-2">
        {["Proposal_v1.pdf", "Proposal_v2.pdf"].map((name, i) => (
          <div
            key={name}
            className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-4"
          >
            <div className="flex items-center gap-2 text-xs font-semibold text-[#111827]">
              <FileText size={14} className="text-red-500" />
              {name}
            </div>
            <div className="mt-3 space-y-2">
              <div className="h-2 w-full rounded-full bg-slate-200" />
              <div
                className={`h-2 rounded-full ${
                  i === 0 ? "w-3/4 bg-slate-200" : "w-full bg-amber-200"
                }`}
              />
              <div className="h-2 w-2/3 rounded-full bg-blue-200" />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 flex flex-wrap gap-2 text-xs">
        <span className="rounded-full bg-blue-50 px-3 py-1 font-medium text-[#2563EB]">
          Similarities found
        </span>
        <span className="rounded-full bg-amber-50 px-3 py-1 font-medium text-amber-700">
          Differences highlighted
        </span>
      </div>
    </div>
  );
}

function ManagementVisual() {
  const files = [
    { name: "Project_Proposal.pdf", size: "2.4 MB" },
    { name: "Research_Paper.pdf", size: "1.8 MB" },
    { name: "Product_Docs.pdf", size: "3.2 MB" },
  ];
  return (
    <div className="space-y-2">
      {files.map((f) => (
        <div
          key={f.name}
          className="flex items-center gap-3 rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] px-3 py-2.5"
        >
          <div className="rounded-md bg-red-50 p-1.5 text-red-500">
            <FileText size={15} />
          </div>
          <span className="min-w-0 flex-1 truncate text-xs font-medium text-[#334155]">
            {f.name}
          </span>
          <span className="text-xs text-[#94A3B8]">{f.size}</span>
        </div>
      ))}
    </div>
  );
}

function HistoryVisual() {
  const chats = [
    { q: "What are the main objectives?", t: "Today" },
    { q: "Compare the two proposals", t: "Yesterday" },
    { q: "List the key deadlines", t: "2 days ago" },
  ];
  return (
    <div className="space-y-2">
      {chats.map((c) => (
        <div
          key={c.q}
          className="flex items-center gap-3 rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] px-3 py-2.5"
        >
          <MessageSquareText size={15} className="shrink-0 text-[#2563EB]" />
          <span className="min-w-0 flex-1 truncate text-xs text-[#334155]">
            {c.q}
          </span>
          <span className="flex items-center gap-1 text-xs text-[#94A3B8]">
            <Clock3 size={11} />
            {c.t}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ----------------------------- Page ----------------------------- */

export default function Home() {
  const { status } = useSession();
  const authed = status === "authenticated";

  return (
    <main className="min-h-screen bg-[#F8FAFC] font-sans text-[#111827]">
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 border-b border-[#E2E8F0] bg-white/85 backdrop-blur-md">
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
          <Logo />

          <div className="hidden items-center gap-8 text-sm font-medium text-[#64748B] md:flex">
            <a href="#features" className="transition hover:text-[#2563EB]">
              Features
            </a>
            <a href="#how-it-works" className="transition hover:text-[#2563EB]">
              How it works
            </a>
            <a href="#technology" className="transition hover:text-[#2563EB]">
              Technology
            </a>
            <a href="#faq" className="transition hover:text-[#2563EB]">
              FAQ
            </a>
          </div>

          <div className="flex items-center gap-2">
            {status === "loading" ? (
              <div className="h-9 w-24 animate-pulse rounded-lg bg-slate-100" />
            ) : authed ? (
              <Button
                asChild
                className="bg-[#2563EB] shadow-sm shadow-blue-600/30 hover:bg-[#1D4ED8]"
              >
                <Link href="/dashboard">Go to Dashboard</Link>
              </Button>
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <Link href="/login">Log in</Link>
                </Button>
                <Button
                  asChild
                  className="bg-[#2563EB] shadow-sm shadow-blue-600/30 hover:bg-[#1D4ED8]"
                >
                  <Link href="/register">Get Started</Link>
                </Button>
              </>
            )}
          </div>
        </nav>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">
        {/* grid + glow background */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to right, #E2E8F0 1px, transparent 1px), linear-gradient(to bottom, #E2E8F0 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            WebkitMaskImage:
              "radial-gradient(ellipse 70% 60% at 50% 0%, black 30%, transparent 75%)",
            maskImage:
              "radial-gradient(ellipse 70% 60% at 50% 0%, black 30%, transparent 75%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 left-1/2 size-[520px] -translate-x-1/2 rounded-full bg-blue-200/40 blur-3xl"
        />

        <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-5 py-20 lg:grid-cols-2 lg:px-8 lg:py-28">
          <div>
            <Badge
              variant="outline"
              className="mb-6 gap-2 border-blue-200 bg-white px-3 py-1.5 text-[#2563EB] shadow-sm"
            >
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#2563EB] opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-[#2563EB]" />
              </span>
              AI-powered document intelligence
            </Badge>

            <h1 className="max-w-2xl text-4xl font-bold leading-[1.1] tracking-tight text-[#111827] sm:text-5xl lg:text-6xl">
              Your Documents.
              <span className="block bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] bg-clip-text text-transparent">
                Smarter Conversations.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-[#64748B] sm:text-lg">
              Stop spending hours searching through documents. Upload your PDFs,
              ask questions, generate summaries, and discover meaningful
              insights with AI-powered document intelligence.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className="bg-[#2563EB] px-6 shadow-lg shadow-blue-600/25 hover:bg-[#1D4ED8]"
              >
                <Link href={authed ? "/dashboard" : "/register"}>
                  {authed ? "Go to Dashboard" : "Get Started"}
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-[#E2E8F0] bg-white"
              >
                <a href="#how-it-works">Explore Features</a>
              </Button>
            </div>

            <div className="mt-8 flex flex-wrap gap-5 text-sm text-[#64748B]">
              <span className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-[#16A34A]" />
                AI-powered Q&A
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-[#16A34A]" />
                Context-based answers
              </span>
            </div>
          </div>

          {/* Product mockup */}
          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-blue-200/60 to-violet-200/40 blur-2xl" />

            {/* floating chips */}
            <div className="absolute -right-3 -top-4 z-10 hidden items-center gap-2 rounded-xl border border-[#E2E8F0] bg-white px-3.5 py-2.5 shadow-lg sm:flex">
              <div className="rounded-md bg-emerald-50 p-1.5 text-[#16A34A]">
                <CheckCircle2 size={15} />
              </div>
              <div>
                <p className="text-xs font-semibold">Document indexed</p>
                <p className="text-[11px] text-[#64748B]">Ready for questions</p>
              </div>
            </div>

            <div className="absolute -bottom-5 -left-4 z-10 hidden items-center gap-2 rounded-xl border border-[#E2E8F0] bg-white px-3.5 py-2.5 shadow-lg sm:flex">
              <div className="rounded-md bg-blue-50 p-1.5 text-[#2563EB]">
                <FileSearch size={15} />
              </div>
              <div>
                <p className="text-xs font-semibold">Source found</p>
                <p className="text-[11px] text-[#64748B]">Page 3 referenced</p>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-2xl shadow-blue-900/10">
              {/* window bar */}
              <div className="flex items-center justify-between border-b border-[#E2E8F0] px-5 py-3.5">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <span className="size-2.5 rounded-full bg-slate-200" />
                    <span className="size-2.5 rounded-full bg-slate-200" />
                    <span className="size-2.5 rounded-full bg-slate-200" />
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="rounded-lg bg-blue-50 p-1.5 text-[#2563EB]">
                      <BrainCircuit size={16} />
                    </div>
                    <p className="text-sm font-semibold">AI Assistant</p>
                  </div>
                </div>
                <Badge className="bg-blue-50 text-[#2563EB] hover:bg-blue-50">
                  Demo Preview
                </Badge>
              </div>

              <div className="grid sm:grid-cols-[170px_1fr]">
                {/* sidebar */}
                <div className="hidden border-r border-[#E2E8F0] bg-white p-3 sm:block">
                  <p className="mb-2 flex items-center gap-1.5 px-2 text-xs font-semibold text-[#64748B]">
                    <FolderOpen size={13} />
                    Documents
                  </p>
                  {[
                    { n: "Business_Proposal", active: true },
                    { n: "Research_Paper", active: false },
                    { n: "Guidelines", active: false },
                  ].map((d) => (
                    <div
                      key={d.n}
                      className={`mb-1 flex items-center gap-2 rounded-lg px-2 py-2 text-xs ${
                        d.active
                          ? "bg-blue-50 font-semibold text-[#2563EB]"
                          : "text-[#64748B]"
                      }`}
                    >
                      <FileText size={14} className="shrink-0" />
                      <span className="truncate">{d.n}</span>
                    </div>
                  ))}
                </div>

                {/* chat */}
                <div className="space-y-4 bg-[#F8FAFC] p-5">
                  <div className="flex items-center gap-3 rounded-xl border border-[#E2E8F0] bg-white p-3">
                    <div className="rounded-lg bg-red-50 p-2 text-red-500">
                      <FileText size={20} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold">
                        Business_Proposal.pdf
                      </p>
                      <p className="text-xs text-[#64748B]">Sample document</p>
                    </div>
                    <CheckCircle2 size={18} className="text-[#16A34A]" />
                  </div>

                  <div className="ml-auto max-w-[90%] rounded-2xl rounded-br-sm bg-[#2563EB] p-3.5 text-sm leading-relaxed text-white shadow-md shadow-blue-600/20">
                    What are the main objectives of this document?
                  </div>

                  <div className="max-w-[95%] rounded-2xl rounded-bl-sm border border-[#E2E8F0] bg-white p-4">
                    <div className="mb-2 flex items-center gap-2 text-sm font-semibold">
                      <Sparkles size={16} className="text-[#2563EB]" />
                      AI Response
                    </div>
                    <p className="text-sm leading-7 text-[#475569]">
                      Based on the uploaded document, the main objectives focus
                      on business growth, improving operational efficiency, and
                      building long-term customer relationships.
                    </p>
                    <div className="mt-3 rounded-lg border border-blue-100 bg-blue-50 p-3">
                      <div className="flex items-center gap-2 text-xs font-semibold text-[#2563EB]">
                        <FileSearch size={15} />
                        Supporting reference
                      </div>
                      <p className="mt-1.5 text-xs text-[#475569]">
                        Business_Proposal.pdf · Page 3
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 rounded-xl border border-[#E2E8F0] bg-white p-2.5 pl-3 text-sm text-[#94A3B8]">
                    <Search size={16} />
                    <span className="truncate">Ask something about your documents...</span>
                    <div className="ml-auto rounded-lg bg-[#2563EB] p-2 text-white">
                      <ArrowUpRight size={15} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="border-y border-[#E2E8F0] bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-y-5 px-5 py-6 sm:grid-cols-4 lg:px-8">
          {trust.map((t) => (
            <div
              key={t.label}
              className="flex items-center justify-center gap-2.5 text-sm font-medium text-[#475569]"
            >
              <t.icon size={18} className="text-[#2563EB]" />
              {t.label}
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="scroll-mt-20 py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeading
            badge="Simple Workflow"
            title="From Documents to Insights"
            description="Understand your documents through a simple AI-powered workflow."
          />

          <div className="relative mt-16 grid gap-6 md:grid-cols-3">
            <div
              aria-hidden
              className="absolute left-[16%] right-[16%] top-8 hidden border-t-2 border-dashed border-blue-200 md:block"
            />

            {steps.map((step) => (
              <div
                key={step.number}
                className="relative rounded-2xl border border-[#E2E8F0] bg-white p-7 text-center transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-900/5"
              >
                <div className="relative z-10 mx-auto -mt-14 flex size-16 items-center justify-center rounded-2xl border-4 border-[#F8FAFC] bg-[#2563EB] text-white shadow-lg shadow-blue-600/30">
                  <step.icon size={26} />
                </div>
                <span className="mt-5 inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-[#2563EB]">
                  Step {step.number}
                </span>
                <h3 className="mt-3 text-lg font-semibold">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#64748B]">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES (bento) */}
      <section
        id="features"
        className="scroll-mt-20 border-y border-[#E2E8F0] bg-white py-24"
      >
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeading
            badge="Powerful Capabilities"
            title="Everything You Need to Understand Your Documents"
            description="One intelligent workspace to organize, explore, and extract useful information from your documents."
          />

          <div className="mt-14 grid gap-5 lg:grid-cols-6">
            <BentoCard
              className="lg:col-span-4"
              icon={MessageSquareText}
              title="AI Document Chat"
              description="Ask questions in natural language and get answers based on the content of your documents."
            >
              <ChatVisual />
            </BentoCard>

            <BentoCard
              className="lg:col-span-2"
              icon={FileSearch}
              title="Contextual Answers"
              description="Find relevant information with supporting document references and page numbers."
            >
              <ReferencesVisual />
            </BentoCard>

            <BentoCard
              className="lg:col-span-2"
              icon={BrainCircuit}
              title="Smart Summaries"
              description="Turn lengthy documents into clear and useful summaries to understand important information faster."
            >
              <SummaryVisual />
            </BentoCard>

            <BentoCard
              className="lg:col-span-4"
              icon={GitCompareArrows}
              title="Document Comparison"
              description="Compare multiple documents and identify important similarities and differences."
            >
              <ComparisonVisual />
            </BentoCard>

            <BentoCard
              className="lg:col-span-3"
              icon={UploadCloud}
              title="Document Management"
              description="Upload, organize, access, and manage your PDF documents from one central workspace."
            >
              <ManagementVisual />
            </BentoCard>

            <BentoCard
              className="lg:col-span-3"
              icon={History}
              title="Chat History"
              description="Keep track of previous conversations and revisit your document-related questions."
            >
              <HistoryVisual />
            </BentoCard>
          </div>
        </div>
      </section>

      {/* TECHNOLOGY */}
      <section id="technology" className="scroll-mt-20 py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeading
            badge="Under the Hood"
            title="Built with Modern Technologies"
            description="A modern full-stack architecture combining web technologies with AI-powered document processing."
          />

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {techGroups.map((group) => (
              <div
                key={group.title}
                className="rounded-2xl border border-[#E2E8F0] bg-white p-7 transition hover:border-blue-200 hover:shadow-lg hover:shadow-blue-900/5"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-blue-50 p-2.5 text-[#2563EB]">
                    <group.icon size={22} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#111827]">
                      {group.title}
                    </h3>
                    <p className="text-xs text-[#64748B]">{group.description}</p>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {group.items.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] px-3.5 py-2 text-sm font-medium text-[#334155] transition hover:border-[#2563EB] hover:text-[#2563EB]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        id="faq"
        className="scroll-mt-20 border-t border-[#E2E8F0] bg-white px-5 py-24"
      >
        <div className="mx-auto max-w-3xl">
          <SectionHeading
            badge="FAQ"
            title="Frequently Asked Questions"
            description="Everything you need to know about DocuMind AI."
          />

          <div className="mt-10 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] px-6 shadow-sm">
            <Accordion type="single" collapsible>
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`faq-${index}`}
                  className="border-[#E2E8F0] last:border-b-0"
                >
                  <AccordionTrigger className="py-5 text-left font-medium hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="leading-7 text-[#64748B]">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-5 py-20">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-[#111827] px-6 py-20 text-center sm:px-12">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "linear-gradient(to right, #334155 1px, transparent 1px), linear-gradient(to bottom, #334155 1px, transparent 1px)",
              backgroundSize: "40px 40px",
              WebkitMaskImage:
                "radial-gradient(ellipse 60% 70% at 50% 50%, black 20%, transparent 75%)",
              maskImage:
                "radial-gradient(ellipse 60% 70% at 50% 50%, black 20%, transparent 75%)",
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 left-1/2 size-96 -translate-x-1/2 rounded-full bg-[#2563EB]/40 blur-3xl"
          />

          <div className="relative">
            <div className="mx-auto mb-5 flex size-14 items-center justify-center rounded-2xl bg-[#2563EB] text-white shadow-lg shadow-blue-600/40">
              <Sparkles size={27} />
            </div>

            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Make Your Documents Work Smarter
            </h2>

            <p className="mx-auto mt-4 max-w-xl leading-7 text-slate-300">
              Spend less time searching and more time understanding. Start
              exploring your documents with DocuMind AI.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button
                asChild
                size="lg"
                className="bg-[#2563EB] px-6 hover:bg-[#1D4ED8]"
              >
                <Link href={authed ? "/dashboard" : "/register"}>
                  {authed ? "Go to Dashboard" : "Get Started"}
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>

              {!authed && (
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-slate-600 bg-transparent text-white hover:bg-white/10 hover:text-white"
                >
                  <Link href="/login">Log in</Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#E2E8F0] bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
          <div className="lg:col-span-2">
            <Logo small />
            <p className="mt-4 max-w-sm text-sm leading-7 text-[#64748B]">
              An AI-powered workspace to upload PDFs, ask questions, summarize,
              and compare your documents.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-[#111827]">Product</h4>
            <ul className="mt-4 space-y-3 text-sm text-[#64748B]">
              <li>
                <a href="#features" className="transition hover:text-[#2563EB]">
                  Features
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="transition hover:text-[#2563EB]">
                  How it works
                </a>
              </li>
              <li>
                <a href="#technology" className="transition hover:text-[#2563EB]">
                  Technology
                </a>
              </li>
              <li>
                <a href="#faq" className="transition hover:text-[#2563EB]">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-[#111827]">Account</h4>
            <ul className="mt-4 space-y-3 text-sm text-[#64748B]">
              <li>
                <Link href="/login" className="transition hover:text-[#2563EB]">
                  Sign in
                </Link>
              </li>
              <li>
                <Link href="/register" className="transition hover:text-[#2563EB]">
                  Create account
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#E2E8F0]">
          <p className="mx-auto max-w-7xl px-5 py-5 text-center text-sm text-[#64748B] lg:px-8">
            © 2026 DocuMind AI. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}