import { useEffect, useState } from "react";
import { getJobs, type Job } from "../api/client";

interface State {
  jobs: Job[];
  loading: boolean;
  error: string | null;
}

export function useJobs(): State {
  const [state, setState] = useState<State>({ jobs: [], loading: true, error: null });

  useEffect(() => {
    getJobs()
      .then(jobs => setState({ jobs, loading: false, error: null }))
      .catch(err => setState({ jobs: [], loading: false, error: err.message }));
  }, []);

  return state;
}