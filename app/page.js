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
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const features = [
  {
    icon: UploadCloud,
    title: "Document Management",
    description:
      "Upload, organize, access, and manage your PDF documents from one central workspace.",
  },
  {
    icon: MessageSquareText,
    title: "AI Document Chat",
    description:
      "Ask questions in natural language and get answers based on the content of your documents.",
  },
  {
    icon: FileSearch,
    title: "Contextual Answers",
    description:
      "Find relevant information with supporting document references and page numbers.",
  },
  {
    icon: BrainCircuit,
    title: "Smart Summaries",
    description:
      "Turn lengthy documents into clear and useful summaries to understand important information faster.",
  },
  {
    icon: GitCompareArrows,
    title: "Document Comparison",
    description:
      "Compare multiple documents and identify important similarities and differences.",
  },
  {
    icon: History,
    title: "Chat History",
    description:
      "Keep track of previous conversations and revisit your document-related questions.",
  },
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

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] font-sans text-[#111827]">

      {/* NAVBAR */}
      <header className="sticky top-0 z-50 border-b border-[#E2E8F0] bg-white/90 backdrop-blur-md">
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">

          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex size-9 items-center justify-center rounded-lg bg-[#2563EB] text-white">
              <FileText size={21} />
            </div>
            <span className="text-xl font-bold tracking-tight text-[#111827]">
              DocuMind <span className="text-[#2563EB]">AI</span>
            </span>
          </Link>

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
            <Button variant="ghost" asChild>
              <Link href="/login">Log in</Link>
            </Button>
            <Button asChild className="bg-[#2563EB] hover:bg-[#1D4ED8]">
              <Link href="/register">Get Started</Link>
            </Button>
          </div>

        </nav>
      </header>

      {/* HERO */}
      <section className="mx-auto grid max-w-7xl items-center gap-14 px-5 py-20 lg:grid-cols-2 lg:px-8 lg:py-28">

        <div>
          <Badge
            variant="outline"
            className="mb-6 gap-2 border-blue-200 bg-blue-50 px-3 py-1.5 text-[#2563EB]"
          >
            <Sparkles size={14} />
            AI-powered document intelligence
          </Badge>

          <h1 className="max-w-2xl text-4xl font-bold leading-tight tracking-tight text-[#111827] sm:text-5xl lg:text-6xl">
            Your Documents.
            <span className="block text-[#2563EB]">
              Smarter Conversations.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-8 text-[#64748B] sm:text-lg">
            Stop spending hours searching through documents.
            Upload your PDFs, ask questions, generate summaries,
            and discover meaningful insights with AI-powered
            document intelligence.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              asChild
              size="lg"
              className="bg-[#2563EB] px-6 hover:bg-[#1D4ED8]"
            >
              <Link href="/register">
                Get Started
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>

            <Button asChild variant="outline" size="lg">
              <a href="#how-it-works">
                Explore Features
              </a>
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

        {/* PRODUCT PREVIEW */}
        <div className="relative">
          <div className="absolute -inset-5 rounded-3xl bg-blue-100/60 blur-3xl" />

          <div className="relative overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-xl">

            <div className="flex items-center justify-between border-b border-[#E2E8F0] px-5 py-4">
              <div className="flex items-center gap-2">
                <div className="rounded-lg bg-blue-50 p-2 text-[#2563EB]">
                  <BrainCircuit size={19} />
                </div>
                <div>
                  <p className="text-sm font-semibold">AI Assistant</p>
                  <p className="text-xs text-[#64748B]">Document workspace</p>
                </div>
              </div>

              <Badge className="bg-blue-50 text-[#2563EB] hover:bg-blue-50">
                Demo Preview
              </Badge>
            </div>

            <div className="space-y-5 bg-[#F8FAFC] p-5 sm:p-7">

              <div className="flex items-center gap-3 rounded-xl border border-[#E2E8F0] bg-white p-3">
                <div className="rounded-lg bg-red-50 p-2 text-red-500">
                  <FileText size={22} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">
                    Business_Proposal.pdf
                  </p>
                  <p className="text-xs text-[#64748B]">
                    Sample document
                  </p>
                </div>
                <CheckCircle2 size={18} className="text-[#16A34A]" />
              </div>

              <div className="ml-auto max-w-[90%] rounded-2xl rounded-br-sm bg-[#2563EB] p-4 text-sm leading-relaxed text-white">
                What are the main objectives of this document?
              </div>

              <div className="max-w-[95%] rounded-2xl rounded-bl-sm border border-[#E2E8F0] bg-white p-4">
                <div className="mb-3 flex items-center gap-2 text-sm font-semibold">
                  <Sparkles size={16} className="text-[#2563EB]" />
                  AI Response
                </div>

                <p className="text-sm leading-7 text-[#475569]">
                  Based on the uploaded document, the main objectives
                  focus on business growth, improving operational
                  efficiency, and building long-term customer relationships.
                </p>

                <div className="mt-4 rounded-lg border border-blue-100 bg-blue-50 p-3">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#2563EB]">
                    <FileSearch size={15} />
                    Supporting reference
                  </div>
                  <p className="mt-2 text-xs text-[#475569]">
                    Business_Proposal.pdf · Page 3
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 rounded-xl border border-[#E2E8F0] bg-white p-3 text-sm text-[#94A3B8]">
                <Search size={17} />
                Ask something about your documents...
                <div className="ml-auto rounded-lg bg-[#2563EB] p-2 text-white">
                  <ArrowUpRight size={16} />
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="border-y border-[#E2E8F0] bg-white py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">

          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="outline" className="mb-4 border-blue-200 text-[#2563EB]">
              Simple Workflow
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              From Documents to Insights
            </h2>
            <p className="mt-4 leading-7 text-[#64748B]">
              Understand your documents through a simple AI-powered workflow.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {steps.map((step) => (
              <div
                key={step.number}
                className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-7 transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div className="rounded-xl bg-blue-50 p-3 text-[#2563EB]">
                    <step.icon size={25} />
                  </div>
                  <span className="text-3xl font-bold text-[#E2E8F0]">
                    {step.number}
                  </span>
                </div>
                <h3 className="mt-6 text-lg font-semibold">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[#64748B]">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="mx-auto max-w-7xl px-5 py-20 lg:px-8">

        <div className="max-w-2xl">
          <Badge variant="outline" className="mb-4 border-blue-200 text-[#2563EB]">
            Powerful Capabilities
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Everything You Need to Understand Your Documents
          </h2>
          <p className="mt-4 leading-7 text-[#64748B]">
            One intelligent workspace to organize, explore, and
            extract useful information from your documents.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-xl border border-[#E2E8F0] bg-white p-7 transition hover:border-blue-200 hover:shadow-md"
            >
              <div className="mb-5 inline-flex rounded-xl bg-blue-50 p-3 text-[#2563EB]">
                <feature.icon size={24} />
              </div>

              <h3 className="text-lg font-semibold">
                {feature.title}
              </h3>

              <p className="mt-3 text-sm leading-7 text-[#64748B]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* TECHNOLOGY */}
      <section id="technology" className="border-y border-[#E2E8F0] bg-white py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">

          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="outline" className="mb-4 border-blue-200 text-[#2563EB]">
              Under the Hood
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Built with Modern Technologies
            </h2>
            <p className="mt-4 leading-7 text-[#64748B]">
              A modern full-stack architecture combining web
              technologies with AI-powered document processing.
            </p>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-3">
            {[
              "Next.js",
              "React.js",
              "Tailwind CSS",
              "shadcn/ui",
              "Node.js",
              "Express.js",
              "MongoDB",
              "Python",
              "FastAPI",
              "LangChain",
              "LangGraph",
              "RAG",
            ].map((tech) => (
              <div
                key={tech}
                className="rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] px-5 py-3 text-sm font-medium text-[#334155] transition hover:border-[#2563EB] hover:text-[#2563EB]"
              >
                {tech}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-3xl px-5 py-20">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-[#64748B]">
            Everything you need to know about DocuMind AI.
          </p>
        </div>

        <Accordion type="single" collapsible className="mt-10">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`faq-${index}`}>
              <AccordionTrigger className="text-left font-medium">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="leading-7 text-[#64748B]">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* CTA */}
      <section className="px-5 pb-20">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-2xl bg-[#111827] px-6 py-16 text-center sm:px-12">

          <div className="mx-auto mb-5 flex size-14 items-center justify-center rounded-2xl bg-[#2563EB] text-white">
            <Sparkles size={27} />
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Make Your Documents Work Smarter
          </h2>

          <p className="mx-auto mt-4 max-w-xl leading-7 text-slate-300">
            Spend less time searching and more time understanding.
            Start exploring your documents with DocuMind AI.
          </p>

          <Button
            asChild
            size="lg"
            className="mt-8 bg-[#2563EB] hover:bg-[#1D4ED8]"
          >
            <Link href="/register">
              Get Started
              <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#E2E8F0] bg-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 py-8 sm:flex-row lg:px-8">

          <Link href="/" className="flex items-center gap-2 font-bold">
            <div className="rounded-lg bg-[#2563EB] p-2 text-white">
              <FileText size={17} />
            </div>
            DocuMind <span className="text-[#2563EB]">AI</span>
          </Link>

          <p className="text-center text-sm text-[#64748B]">
            © {new Date().getFullYear()} DocuMind AI. All rights reserved.
          </p>

          <Link
            href="/login"
            className="text-sm font-medium text-[#64748B] hover:text-[#2563EB]"
          >
            Sign in
          </Link>
        </div>
      </footer>

    </main>
  );
}
