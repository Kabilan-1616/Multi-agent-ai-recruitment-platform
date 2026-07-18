import { useState, useMemo, useEffect } from "react";
import Header from "../components/Header";
import UploadForm from "../components/UploadForm";
import LoadingOverlay from "../components/LoadingOverlay";
import DashboardStats from "../components/DashboardStats";
import SearchBar from "../components/SearchBar";
import FilterSortBar from "../components/FilterSortBar";
import CandidateRankingList from "../components/CandidateRankingList";
import CandidateDetailPanel from "../components/CandidateDetailPanel";
import EmptyState from "../components/EmptyState";
import { normalizeCandidates, toList } from "../utils/candidate";
import "../styles/home.css";
import "../styles/toolbar.css";
import "../styles/workspace.css";

export default function Home() {

    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [selectedId, setSelectedId] = useState(null);

    const [search, setSearch] = useState("");
    const [recommendationFilter, setRecommendationFilter] = useState("all");
    const [minScore, setMinScore] = useState(0);
    const [sortBy, setSortBy] = useState("scoreDesc");

    const handleAnalyzeStart = () => {
        setResult(null);
        setSelectedId(null);
        setLoading(true);
    };

    const handleAnalyzeComplete = (data) => {
        setResult(data);
        setLoading(false);
    };

    const handleAnalyzeError = () => {
        setLoading(false);
    };

    const allCandidates = useMemo(() => normalizeCandidates(result), [result]);

    const filteredCandidates = useMemo(() => {
        const query = search.trim().toLowerCase();

        let list = allCandidates.filter((c) => {
            if (recommendationFilter !== "all" && c.tone !== recommendationFilter) return false;
            if (typeof c.score === "number" && c.score < minScore) return false;
            if (minScore > 0 && typeof c.score !== "number") return false;

            if (!query) return true;

            const skills = toList(c.raw?.match_report?.skill_match?.matched_skills || c.raw?.match_report?.skill_match?.matched)
                .concat(toList(c.raw?.match_report?.skill_match?.required_skills))
                .join(" ")
                .toLowerCase();

            return (
                c.name.toLowerCase().includes(query) ||
                c.email.toLowerCase().includes(query) ||
                skills.includes(query)
            );
        });

        list = [...list].sort((a, b) => {
            switch (sortBy) {
                case "scoreAsc":
                    return (a.score ?? Infinity) - (b.score ?? Infinity);
                case "name":
                    return a.name.localeCompare(b.name);
                case "recent":
                    return a.originalIndex - b.originalIndex;
                case "scoreDesc":
                default:
                    return (b.score ?? -Infinity) - (a.score ?? -Infinity);
            }
        });

        return list;
    }, [allCandidates, search, recommendationFilter, minScore, sortBy]);

    // Keep a valid candidate selected whenever the underlying data or filters change.
    useEffect(() => {
        if (filteredCandidates.length === 0) {
            setSelectedId(null);
            return;
        }
        if (!filteredCandidates.some((c) => c.id === selectedId)) {
            setSelectedId(filteredCandidates[0].id);
        }
    }, [filteredCandidates, selectedId]);

    const selectedEntry = filteredCandidates.find((c) => c.id === selectedId) || null;

    return (
        <div className="page">
            <Header />

            <div className="page-inner">

                <UploadForm
                    loading={loading}
                    onAnalyzeStart={handleAnalyzeStart}
                    onAnalyzeComplete={handleAnalyzeComplete}
                    onAnalyzeError={handleAnalyzeError}
                />

                {loading && <LoadingOverlay />}

                {!result && !loading && (
                    <div className="section-gap">
                        <EmptyState />
                    </div>
                )}

                {result && (
                    <>
                        <div className="section-gap">
                            <DashboardStats candidates={allCandidates} />
                        </div>

                        <div className="section-gap toolbar">
                            <SearchBar value={search} onChange={setSearch} />
                            <FilterSortBar
                                recommendation={recommendationFilter}
                                onRecommendationChange={setRecommendationFilter}
                                minScore={minScore}
                                onMinScoreChange={setMinScore}
                                sortBy={sortBy}
                                onSortByChange={setSortBy}
                            />
                        </div>

                        <div className="section-gap workspace">
                            <CandidateRankingList
                                candidates={filteredCandidates}
                                selectedId={selectedId}
                                onSelect={setSelectedId}
                            />
                            <CandidateDetailPanel entry={selectedEntry} />
                        </div>
                    </>
                )}

            </div>
        </div>
    );
}
