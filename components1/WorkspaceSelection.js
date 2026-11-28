"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Plus,
  FolderOpen,
  ArrowRight,
  Loader2,
  BriefcaseBusiness,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";

export default function WorkspaceSelection() {
  const router = useRouter();

  const [workspaces, setWorkspaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const fetchWorkspaces = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(
        "/api/v1/workspace/getAllWorkspace",
        {
          withCredentials: true,
        },
      );

      setWorkspaces(response.data.data || []);
    } catch (error) {
      console.error("Fetch workspaces error:", error);

      setError(error.response?.data?.message || "Failed to fetch workspaces");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkspaces();
  }, []);

  const handleCreateWorkspace = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      setError("Workspace name is required");
      return;
    }

    try {
      setCreating(true);
      setError("");

      const response = await axios.post(
        "/api/v1/workspace/create",
        {
          name: formData.name.trim(),
          description: formData.description.trim(),
        },
        {
          withCredentials: true,
        },
      );

      const newWorkspace = response.data.data;

      if (!newWorkspace?._id) {
        throw new Error("Workspace was created but its ID was not returned");
      }

      localStorage.setItem("lastWorkspaceId", newWorkspace._id);

      router.push(`/dashboard?workspaceId=${newWorkspace._id}`);
    } catch (error) {
      console.error("Create workspace error:", error);

      setError(
        error.response?.data?.message ||
          error.message ||
          "Workspace creation failed",
      );
    } finally {
      setCreating(false);
    }
  };

  const handleSelectWorkspace = (workspace) => {
    setSelectedId(workspace._id);

    localStorage.setItem("lastWorkspaceId", workspace._id);

    router.push(`/dashboard?workspaceId=${workspace._id}`);
  };

  

  return (
    <div className="min-h-full bg-[#F8FAFC] p-6 md:p-10">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-10">
          <div className="mb-3 flex size-12 items-center justify-center rounded-xl bg-[#2563EB]/10 text-[#2563EB]">
            <BriefcaseBusiness size={24} />
          </div>

          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
            Your Workspaces
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Select a workspace to continue or create a new one.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-5 flex items-center justify-between rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
            {error}

            <button onClick={() => setError("")}>
              <X size={16} />
            </button>
          </div>
        )}

        {/* Loading */}
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-[#2563EB]" size={28} />
          </div>
        ) : (
          <>
            {/* Workspace list */}
            <div className="mb-5 flex items-center justify-between">
              <h2 className="font-semibold text-slate-800">
                Existing Workspaces
              </h2>

              <span className="text-sm text-slate-500">
                {workspaces.length} workspaces
              </span>
            </div>

            {workspaces.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {workspaces.map((workspace) => (
                  <Card
                    key={workspace._id}
                    onClick={() => handleSelectWorkspace(workspace)}
                    className="cursor-pointer border-slate-200 transition-all hover:-translate-y-1 hover:border-[#2563EB] hover:shadow-md"
                  >
                    <CardHeader>
                      <div className="mb-2 flex items-center justify-between">
                        <div className="flex size-11 items-center justify-center rounded-lg bg-[#2563EB]/10 text-[#2563EB]">
                          <FolderOpen size={22} />
                        </div>

                        <ArrowRight size={18} className="text-slate-400" />
                      </div>

                      <CardTitle className="text-base">
                        {workspace.name}
                      </CardTitle>

                      <CardDescription className="line-clamp-2">
                        {workspace.description || "No description available"}
                      </CardDescription>
                    </CardHeader>

                    <CardContent>
                      <p className="text-xs font-medium text-[#2563EB]">
                        Open workspace
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-slate-300 bg-white py-12 text-center">
                <FolderOpen size={36} className="mx-auto mb-3 text-slate-400" />

                <h3 className="font-medium text-slate-800">
                  No workspaces yet
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Create your first workspace to get started.
                </p>
              </div>
            )}

            {/* Create workspace */}
            <div className="mt-8">
              {!showForm ? (
                <Button
                  onClick={() => setShowForm(true)}
                  className="bg-[#2563EB] hover:bg-[#1D4ED8]"
                >
                  <Plus size={18} className="mr-2" />
                  Create New Workspace
                </Button>
              ) : (
                <Card className="max-w-xl border-slate-200">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Create Workspace</CardTitle>

                        <CardDescription className="mt-1">
                          Give your workspace a name and description.
                        </CardDescription>
                      </div>

                      <button
                        onClick={() => setShowForm(false)}
                        className="text-slate-400 hover:text-slate-700"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <form
                      onSubmit={handleCreateWorkspace}
                      className="space-y-4"
                    >
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Workspace Name
                        </label>

                        <Input
                          placeholder="e.g. Research Workspace"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              name: e.target.value,
                            })
                          }
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Description
                        </label>

                        <Textarea
                          placeholder="What is this workspace for?"
                          rows={3}
                          value={formData.description}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              description: e.target.value,
                            })
                          }
                        />
                      </div>

                      <Button
                        type="submit"
                        disabled={creating}
                        className="w-full bg-[#2563EB] hover:bg-[#1D4ED8]"
                      >
                        {creating ? (
                          <>
                            <Loader2 className="mr-2 animate-spin" size={16} />
                            Creating...
                          </>
                        ) : (
                          "Create Workspace"
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
