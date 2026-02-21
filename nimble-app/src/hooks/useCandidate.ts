import { useEffect, useState } from "react";
import { getCandidate, type Candidate } from "../api/client";

interface State {
  candidate: Candidate | null;
  loading: boolean;
  error: string | null;
}

export function useCandidate(email: string): State {
  const [state, setState] = useState<State>({ candidate: null, loading: true, error: null });

  useEffect(() => {
    setState({ candidate: null, loading: true, error: null });
    getCandidate(email)
      .then(candidate => setState({ candidate, loading: false, error: null }))
      .catch(err => setState({ candidate: null, loading: false, error: err.message }));
  }, [email]);

  return state;
}