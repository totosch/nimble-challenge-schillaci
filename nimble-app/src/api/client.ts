const BASE_URL = "https://botfilter-h5ddh6dye8exb7ha.centralus-01.azurewebsites.net/api";

export interface Candidate {
  uuid: string;
  candidateId: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface Job {
  id: string;
  title: string;
}

export interface ApplyBody {
  uuid: string;
  jobId: string;
  candidateId: string;
  repoUrl: string;
}

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: "error" }));
    throw new Error(error.message ?? `HTTP ${res.status}`);
  }
  return res.json();
}

export const getCandidate = (email: string): Promise<Candidate> =>
  fetch(`${BASE_URL}/candidate/get-by-email?email=${email}`)
    .then(handleResponse<Candidate>);

export const getJobs = (): Promise<Job[]> =>
  fetch(`${BASE_URL}/jobs/get-list`)
    .then(handleResponse<Job[]>);

export const applyToJob = (body: ApplyBody): Promise<{ ok: boolean }> =>
  fetch(`${BASE_URL}/candidate/apply-to-job`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  }).then(handleResponse<{ ok: boolean }>);