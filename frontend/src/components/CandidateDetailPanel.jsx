import { useState, useEffect } from "react";
import { Mail, Phone, Sparkles, ChevronDown, Trophy } from "lucide-react";
import ScoreBadge from "./ScoreBadge";
import ProgressBar from "./ProgressBar";
import SkillSection from "./SkillSection";
import InterviewSection from "./InterviewSection";
import ExplanationSection from "./ExplanationSection";
import EmailSection from "./EmailSection";
import { getInitials, recommendationTone, rankBadge } from "../utils/candidate";
import "../styles/candidate-card.css";
import "../styles/workspace.css";

const SECTIONS = [
    { key: "skills", label: "Skill Match" },
    { key: "interview", label: "Interview Questions" },
    { key: "explanation", label: "AI Evaluation" },
    { key: "email", label: "Email Draft" },
];

export default function CandidateDetailPanel({ entry }) {

    const [openSection, setOpenSection] = useState("skills");

    // Reset the open accordion section whenever a different candidate is selected.
    useEffect(() => {
        setOpenSection("skills");
    }, [entry?.id]);

    if (!entry) {
        return (
            <div className="detail-panel">
                <p className="placeholder-text">Select a candidate from the ranking list to see details.</p>
            </div>
        );
    }

    const candidate = entry.raw;
    const person = candidate?.candidate || {};
    const matchReport = candidate?.match_report || {};
    const explanation = candidate?.explanation || {};
    const score = entry.score;
    const recommendation = entry.recommendation;
    const tone = recommendationTone(recommendation);
    const summary = explanation.summary || null;

    const toggleSection = (key) => {
        setOpenSection((current) => (current === key ? null : key));
    };

    const renderSectionBody = (key) => {
        switch (key) {
            case "skills":
                return <SkillSection skillMatch={matchReport.skill_match} />;
            case "interview":
                return <InterviewSection questions={candidate?.interview_questions} />;
            case "explanation":
                return <ExplanationSection explanation={candidate?.explanation} />;
            case "email":
                return <EmailSection emailDraft={candidate?.email_draft} />;
            default:
                return null;
        }
    };

    return (
        <div className="detail-panel">

            <div className="detail-header">
                <div className="detail-identity">
                    <div className="detail-avatar">{getInitials(person.name)}</div>
                    <div>
                        <div className="detail-name-row">
                            <h2 className="detail-name">{person.name || "Unnamed Candidate"}</h2>
                            <span className="rank-pill">
                                <Trophy size={12} />
                                Rank #{entry.rank}
                            </span>
                        </div>
                        <div className="detail-meta">
                            <span><Mail /> {person.email || "No email on file"}</span>
                            {person.phone && <span><Phone /> {person.phone}</span>}
                        </div>
                    </div>
                </div>

                <div className="detail-badges">
                    {recommendation && (
                        <span className={`recommendation-badge tone-${tone}`}>{recommendation}</span>
                    )}
                    <ScoreBadge score={score} large />
                </div>
            </div>

            {summary && (
                <div className="ai-summary-box">
                    <Sparkles />
                    <div>
                        <div className="ai-summary-label">AI Summary</div>
                        <div className="ai-summary-text">{summary}</div>
                    </div>
                </div>
            )}

            <div className="section-gap">
                <ProgressBar value={score} large />
            </div>

            <div className="accordion">
                {SECTIONS.map((section) => {
                    const isOpen = openSection === section.key;
                    return (
                        <div className="accordion-item" key={section.key}>
                            <button
                                type="button"
                                className="accordion-trigger"
                                aria-expanded={isOpen}
                                onClick={() => toggleSection(section.key)}
                            >
                                {section.label}
                                <ChevronDown className="accordion-chevron" />
                            </button>
                            <div className={`accordion-panel ${isOpen ? "open" : ""}`}>
                                <div className="accordion-body">
                                    {renderSectionBody(section.key)}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

        </div>
    );
}
