import { scoreTier } from "../utils/candidate";

export default function ScoreBadge({ score, large = false }) {

    const value = typeof score === "number" ? Math.round(score) : null;
    const tier = scoreTier(value);

    return (
        <div
            className={`score-badge tier-${tier} ${large ? "large" : ""}`}
            title="Overall match score"
        >
            <span>{value !== null ? `${value}%` : "—"}</span>
            <span className="score-label">Score</span>
        </div>
    );
}
