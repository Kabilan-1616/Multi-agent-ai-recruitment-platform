import { Filter, ArrowUpDown, ChevronDown } from "lucide-react";
import "../styles/toolbar.css";

export default function FilterSortBar({
    recommendation,
    onRecommendationChange,
    minScore,
    onMinScoreChange,
    sortBy,
    onSortByChange,
}) {
    return (
        <>
            <div className="select-control">
                <Filter className="select-icon" />
                <select value={recommendation} onChange={(e) => onRecommendationChange(e.target.value)}>
                    <option value="all">All</option>
                    <option value="success">Proceed to Interview</option>
                    <option value="warning">Recruiter Review</option>
                    <option value="danger">Rejected</option>
                </select>
                <ChevronDown className="select-chevron" />
            </div>

            <div className="select-control">
                <Filter className="select-icon" />
                <select value={minScore} onChange={(e) => onMinScoreChange(Number(e.target.value))}>
                    <option value={0}>Minimum Score</option>
                    <option value={60}>60+</option>
                    <option value={70}>70+</option>
                    <option value={80}>80+</option>
                </select>
                <ChevronDown className="select-chevron" />
            </div>

            <div className="select-control">
                <ArrowUpDown className="select-icon" />
                <select value={sortBy} onChange={(e) => onSortByChange(e.target.value)}>
                    <option value="scoreDesc">Highest Score</option>
                    <option value="scoreAsc">Lowest Score</option>
                    <option value="name">Candidate Name</option>
                    <option value="recent">Recently Added</option>
                </select>
                <ChevronDown className="select-chevron" />
            </div>
        </>
    );
}
