
import Link from "next/link";
import {
  FileText,
  BrainCircuit,
  FileSearch,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";

export function Logo({ className = "" }) {
  return (
    <Link href="/" className={`flex items-center gap-2.5 ${className}`}>
      <div className="flex size-9 items-center justify-center rounded-lg bg-[#2563EB] text-white">
        <FileText size={21} />
      </div>
      <span className="text-xl font-bold tracking-tight text-[#111827]">
        DocuMind <span className="text-[#2563EB]">AI</span>
      </span>
    </Link>
  );
}

export default function AuthShowcase({ heading, accent }) {
  return (
    <aside className="relative hidden h-full min-h-0 overflow-hidden border-r border-[#E2E8F0] bg-[#F8FAFC] p-8 xl:p-10 lg:flex lg:flex-col lg:justify-between">

      <Logo />

      <div className="my-auto">
        <Badge
          variant="outline"
          className="mb-5 gap-2 border-blue-200 bg-blue-50 px-3 py-1.5 text-[#2563EB]"
        >
          <Sparkles size={14} />
          AI-powered document intelligence
        </Badge>

        <h2 className="max-w-md text-4xl font-bold leading-tight tracking-tight text-[#111827] xl:text-5xl">
          {heading}
          <span className="block text-[#2563EB]">{accent}</span>
        </h2>

        {/* Product preview */}
        <div className="relative mt-7 max-w-md">
          <div className="absolute -inset-4 rounded-3xl bg-blue-100/60 blur-3xl" />

          <div className="relative overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-xl">

            <div className="flex items-center justify-between border-b border-[#E2E8F0] px-4 py-3">
              <div className="flex items-center gap-2">
                <div className="rounded-lg bg-blue-50 p-2 text-[#2563EB]">
                  <BrainCircuit size={19} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#111827]">
                    AI Assistant
                  </p>
                  <p className="text-xs text-[#64748B]">
                    Document workspace
                  </p>
                </div>
              </div>

              <Badge className="bg-blue-50 text-[#2563EB] hover:bg-blue-50">
                Demo Preview
              </Badge>
            </div>

            <div className="space-y-3 bg-[#F8FAFC] p-4">

              <div className="flex items-center gap-3 rounded-xl border border-[#E2E8F0] bg-white p-3">
                <div className="rounded-lg bg-red-50 p-2 text-red-500">
                  <FileText size={20} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-[#111827]">
                    Business_Proposal.pdf
                  </p>
                  <p className="text-xs text-[#64748B]">
                    Sample document
                  </p>
                </div>
                <CheckCircle2 size={18} className="text-[#16A34A]" />
              </div>

              <div className="ml-auto max-w-[90%] rounded-2xl rounded-br-sm bg-[#2563EB] p-3 text-sm leading-relaxed text-white">
                What are the main objectives of this document?
              </div>

              <div className="max-w-[95%] rounded-2xl rounded-bl-sm border border-[#E2E8F0] bg-white p-3">
                <p className="text-sm leading-6 text-[#475569]">
                  The main objectives are business growth, better operational
                  efficiency, and long-term customer relationships.
                </p>

                <div className="mt-2 flex items-center gap-2 rounded-lg border border-blue-100 bg-blue-50 px-3 py-2 text-xs font-semibold text-[#2563EB]">
                  <FileSearch size={15} />
                  Business_Proposal.pdf · Page 3
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      <p className="text-sm text-[#64748B]">
        Your documents stay private to your account.
      </p>

    </aside>
  );
}
