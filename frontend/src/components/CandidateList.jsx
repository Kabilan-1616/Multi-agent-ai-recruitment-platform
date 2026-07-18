import CandidateCard from "./CandidateCard";

export default function CandidateList({ data }) {

    if (!data) return null;

    const candidates = Array.isArray(data.candidates) ? data.candidates : [];

    const ranked = [...candidates].sort((a, b) => {
        const scoreA = a?.match_report?.overall_score ?? -Infinity;
        const scoreB = b?.match_report?.overall_score ?? -Infinity;
        return scoreB - scoreA;
    });

    return (
        <div className="section-gap">
            <div className="results-header">
                <h2 className="results-title">Candidate Ranking</h2>
                <span className="results-count">
                    {ranked.length} candidate{ranked.length === 1 ? "" : "s"} evaluated
                </span>
            </div>

            {ranked.length === 0 ? (
                <div className="empty-state">
                    <div className="empty-state-title">No candidates yet</div>
                    <p>Upload a job description and resumes to see AI-ranked candidates here.</p>
                </div>
            ) : (
                ranked.map((candidate, i) => (
                    <CandidateCard
                        key={candidate?.candidate?.email || i}
                        candidate={candidate}
                    />
                ))
            )}
        </div>
    );
}
