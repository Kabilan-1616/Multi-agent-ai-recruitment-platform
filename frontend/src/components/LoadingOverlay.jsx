import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import "../styles/upload.css";

const STEPS = [
    "Parsing resumes",
    "Extracting candidate profiles",
    "Matching skills",
    "Ranking candidates",
    "Generating interview questions",
    "Writing recruiter emails",
];

export default function LoadingOverlay() {

    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev < STEPS.length - 1 ? prev + 1 : prev));
        }, 1200);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="loading-backdrop" role="status" aria-live="polite">
            <div className="loading-card">
                <div className="loading-spinner-ring" />
                <div className="loading-heading">AI is analyzing resumes...</div>
                <div className="loading-subheading">This usually takes a few moments</div>

                <div className="loading-steps">
                    {STEPS.map((step, i) => {
                        const state = i < activeIndex ? "done" : i === activeIndex ? "active" : "";
                        return (
                            <div key={step} className={`loading-step ${state}`}>
                                <span className="loading-step-icon">
                                    {i < activeIndex && <Check strokeWidth={3} />}
                                </span>
                                <span>{step}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
