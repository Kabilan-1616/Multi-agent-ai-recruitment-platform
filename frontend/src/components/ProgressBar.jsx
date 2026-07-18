import { useEffect, useRef, useState } from "react";
import { scoreTier } from "../utils/candidate";

const FILL_COLOR = {
    success: "linear-gradient(90deg, #16a34a, #22c55e)",
    warning: "linear-gradient(90deg, #d97706, #f59e0b)",
    danger: "linear-gradient(90deg, #dc2626, #ef4444)",
    neutral: "linear-gradient(90deg, #9ca3af, #d1d5db)",
};

export default function ProgressBar({ value, large = false }) {

    const safeValue = typeof value === "number" ? Math.max(0, Math.min(100, value)) : 0;
    const [width, setWidth] = useState(0);
    const frameRef = useRef(null);
    const tier = scoreTier(value);

    useEffect(() => {
        frameRef.current = requestAnimationFrame(() => setWidth(safeValue));
        return () => cancelAnimationFrame(frameRef.current);
    }, [safeValue]);

    return (
        <div className="progress-wrap">
            <div className="progress-labels">
                <span>Overall Match Score</span>
                <span>{typeof value === "number" ? `${Math.round(value)}%` : "N/A"}</span>
            </div>
            <div className={`progress-track ${large ? "large" : ""}`}>
                <div
                    className="progress-fill"
                    style={{ width: `${width}%`, background: FILL_COLOR[tier] }}
                />
            </div>
        </div>
    );
}
