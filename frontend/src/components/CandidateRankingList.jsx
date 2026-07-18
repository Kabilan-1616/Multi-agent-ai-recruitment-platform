import { getInitials, rankBadge } from "../utils/candidate";
import "../styles/workspace.css";

export default function CandidateRankingList({ candidates, selectedId, onSelect }) {
    return (
        <div className="ranking-panel">
            <div className="ranking-panel-header">Candidate Ranking</div>

            {candidates.length === 0 ? (
                <div className="no-results">No candidates match your filters.</div>
            ) : (
                <div className="ranking-list">
                    {candidates.map((c) => (
                        <button
                            type="button"
                            key={c.id}
                            className={`ranking-item ${c.id === selectedId ? "selected" : ""}`}
                            onClick={() => onSelect(c.id)}
                        >
                            <span className="ranking-medal">{rankBadge(c.rank)}</span>
                            <span className="ranking-avatar">{getInitials(c.name)}</span>
                            <span className="ranking-info">
                                <span className="ranking-name">{c.name}</span>
                                <span className="ranking-sub">
                                    <span className={`ranking-score ${c.tone}`}>
                                        {typeof c.score === "number" ? `${Math.round(c.score)}%` : "—"}
                                    </span>
                                    <span className="ranking-rec">{c.recommendation || "Not evaluated"}</span>
                                </span>
                            </span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
