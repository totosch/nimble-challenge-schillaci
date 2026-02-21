import { useState } from "react";
import { applyToJob, type Job, type Candidate } from "../api/client";

interface Props {
  job: Job;
  candidate: Candidate;
}

type SubmitState = "idle" | "loading" | "success" | "error";

export function JobCard({ job, candidate }: Props) {
  const [repoUrl, setRepoUrl] = useState<string>("");
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!repoUrl.trim()) {
      setErrorMessage("Please enter a repo URL before submitting.");
      return;
    }

    setSubmitState("loading");
    setErrorMessage(null);

    try {
      await applyToJob({
        uuid: candidate.uuid,
        jobId: job.id,
        candidateId: candidate.candidateId,
        repoUrl
      });
      setSubmitState("success");
    } catch (err) {
      setSubmitState("error");
      setErrorMessage(err instanceof Error ? err.message : "Failed to submit.");
    }
  };

  return (
    <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-5 hover:border-zinc-700/80 hover:bg-zinc-900 transition-all duration-300">
      
      <h3 className="text-lg font-medium text-zinc-100 mb-4 tracking-wide">
        {job.title}
      </h3>

      <div className="flex items-center gap-3">
        <input
          className="flex-1 bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all disabled:opacity-50"
          placeholder="GitHub repo URL..."
          value={repoUrl}
          onChange={(e) => {
            setRepoUrl(e.target.value);
            if (errorMessage) setErrorMessage(null);
            if (submitState === "error") setSubmitState("idle");
          }}
          disabled={submitState === "loading" || submitState === "success"}
        />

        <button
          onClick={handleSubmit}
          disabled={submitState === "loading" || submitState === "success"}
          className="px-6 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-xl hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all whitespace-nowrap"
        >
          {submitState === "loading" ? "Sending..." : "Submit"}
        </button>
      </div>

      {errorMessage && (
        <p className="text-red-400 text-sm mt-3 font-medium">
          {errorMessage}
        </p>
      )}

      {submitState === "success" && (
        <p className="text-emerald-400 text-sm mt-3 font-medium">
          Application sent successfully.
        </p>
      )}
    </div>
  );
}