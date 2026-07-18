import { useState } from "react";
import ScoreBadge from "./ScoreBadge";
import ProgressBar from "./ProgressBar";
import SkillSection from "./SkillSection";
import InterviewSection from "./InterviewSection";
import ExplanationSection from "./ExplanationSection";
import EmailSection from "./EmailSection";
import "../styles/candidate-card.css";

function getInitials(name) {
    if (!name) return "?";
    const parts = name.trim().split(/\s+/);
    const initials = parts.slice(0, 2).map((p) => p[0]?.toUpperCase()).join("");
    return initials || "?";
}

function recommendationTone(recommendation) {
    if (!recommendation) return "tone-neutral";
    const value = recommendation.toLowerCase();
    if (value.includes("reject")) return "tone-danger";
    if (value.includes("review")) return "tone-warning";
    if (value.includes("proceed") || value.includes("interview") || value.includes("hire")) return "tone-success";
    return "tone-neutral";
}

const SECTIONS = [
    { key: "skills", label: "Skill Match" },
    { key: "interview", label: "Interview Questions" },
    { key: "explanation", label: "AI Evaluation" },
    { key: "email", label: "Email Draft" },
];

export default function CandidateCard({ candidate }) {

    const [openSection, setOpenSection] = useState("skills");

    const person = candidate?.candidate || {};
    const matchReport = candidate?.match_report || {};
    const score = typeof matchReport.overall_score === "number" ? matchReport.overall_score : null;
    const recommendation = matchReport.recommendation || null;
    const tone = recommendationTone(recommendation);

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
        <div className="candidate-card">

            <div className="candidate-top">
                <div className="candidate-identity">
                    <div className="avatar-circle">{getInitials(person.name)}</div>
                    <div>
                        <h3 className="candidate-name">{person.name || "Unnamed Candidate"}</h3>
                        <div className="candidate-meta">
                            <span>{person.email || "No email on file"}</span>
                            {person.phone && <span>{person.phone}</span>}
                        </div>
                    </div>
                </div>

                <div className="candidate-badges">
                    {recommendation && (
                        <span className={`recommendation-badge ${tone}`}>{recommendation}</span>
                    )}
                    <ScoreBadge score={score} />
                </div>
            </div>

            <ProgressBar value={score} />

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
                                <svg className="accordion-chevron" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="m5 7.5 5 5 5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
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
