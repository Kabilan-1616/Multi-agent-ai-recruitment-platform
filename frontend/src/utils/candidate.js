export function getInitials(name) {
    if (!name) return "?";
    const parts = name.trim().split(/\s+/);
    const initials = parts.slice(0, 2).map((p) => p[0]?.toUpperCase()).join("");
    return initials || "?";
}

export function recommendationTone(recommendation) {
    if (!recommendation) return "neutral";
    const value = recommendation.toLowerCase();
    if (value.includes("reject")) return "danger";
    if (value.includes("review")) return "warning";
    if (value.includes("proceed") || value.includes("interview") || value.includes("hire")) return "success";
    return "neutral";
}

export function scoreTier(score) {
    if (typeof score !== "number") return "neutral";
    if (score >= 80) return "success";
    if (score >= 60) return "warning";
    return "danger";
}

export function toList(value) {
    if (!value) return [];
    if (Array.isArray(value)) {
        return value.map((item) =>
            typeof item === "string" ? item : item?.skill || item?.name || JSON.stringify(item)
        );
    }
    return [];
}

export const RANK_MEDALS = ["🥇", "🥈", "🥉"];

export function rankBadge(rank) {
    if (rank <= 3) return RANK_MEDALS[rank - 1];
    return `#${rank}`;
}

// Normalizes the raw /analyze response into a flat, ranked array while
// leaving the original candidate object untouched so every field the
// backend sends is still reachable downstream.
export function normalizeCandidates(data) {
    const candidates = Array.isArray(data?.candidates) ? data.candidates : [];

    const withScore = candidates.map((candidate, index) => {
        const score = candidate?.match_report?.overall_score;
        return {
            raw: candidate,
            id: candidate?.candidate?.email || `candidate-${index}`,
            name: candidate?.candidate?.name || "Unnamed Candidate",
            email: candidate?.candidate?.email || "",
            phone: candidate?.candidate?.phone || "",
            score: typeof score === "number" ? score : null,
            recommendation: candidate?.match_report?.recommendation || "",
            originalIndex: index,
        };
    });

    const ranked = [...withScore].sort((a, b) => (b.score ?? -Infinity) - (a.score ?? -Infinity));
    const rankById = new Map(ranked.map((c, i) => [c.id, i + 1]));

    return withScore.map((c) => ({
        ...c,
        rank: rankById.get(c.id),
        tone: recommendationTone(c.recommendation),
    }));
}
