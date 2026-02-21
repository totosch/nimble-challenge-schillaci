import { useCandidate } from "./hooks/useCandidate";
import { useJobs } from "./hooks/useJobs";
import { JobCard } from "./components/JobCard";

function App() {
  const { candidate, loading: candidateLoading, error: candidateError } = useCandidate("rodrigoschillaci97@gmail.com");
  const { jobs, loading: jobsLoading, error: jobsError } = useJobs();

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-300 font-sans antialiased selection:bg-blue-500/30">
      
      <div className="max-w-2xl mx-auto p-6 pt-12 sm:pt-20">
        
        <header className="mb-10">
          <h1 className="text-3xl font-semibold tracking-tight text-white mb-2">
            Nimble Gravity Jobs
          </h1>
          
          {candidateLoading && <p className="text-zinc-500 animate-pulse">Loading...</p>}
          {candidateError && <p className="text-red-400">error: {candidateError}</p>}
          
          {candidate && (
            <p className="text-zinc-400 text-lg">
              Candidate: <span className="text-zinc-100 font-medium">{candidate.firstName} {candidate.lastName}</span>
            </p>
          )}
        </header>

        {jobsLoading && <p className="text-zinc-500 animate-pulse">Searching jobs...</p>}
        {jobsError && <p className="text-red-400">error: {jobsError}</p>}

        {candidate && !jobsLoading && (
          <div className="flex flex-col gap-4">
            {jobs.map(job => (
              <JobCard key={job.id} job={job} candidate={candidate} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;