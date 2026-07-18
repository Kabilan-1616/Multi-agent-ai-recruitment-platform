import { Sparkles } from "lucide-react";
import "../styles/header.css";

const today = new Date().toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
});

export default function Header() {
    return (
        <header className="app-header">
            <div className="app-header-inner">
                <div className="app-header-brand">
                    <div className="app-header-icon">
                        <Sparkles />
                    </div>
                    <div>
                        <div className="app-header-title">AI Recruitment Platform</div>
                        <div className="app-header-subtitle">
                            Multi-Agent Resume Screening • Candidate Ranking • Interview Generation
                        </div>
                    </div>
                </div>

                <div className="app-header-right">
                    <span className="app-header-date">{today}</span>
                    <span className="ai-status">
                        <span className="ai-status-dot" />
                        Ready
                    </span>
                    <div className="header-avatar">HR</div>
                </div>
            </div>
        </header>
    );
}
