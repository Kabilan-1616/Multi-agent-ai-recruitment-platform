import { Brain } from "lucide-react";

export default function EmptyState() {
    return (
        <div className="empty-state">
            <div className="empty-state-illustration">
                <Brain strokeWidth={1.5} />
            </div>
            <div className="empty-state-title">No analysis yet</div>
            <p className="empty-state-text">
                Upload a job description and resumes to begin AI analysis.
            </p>
        </div>
    );
}
