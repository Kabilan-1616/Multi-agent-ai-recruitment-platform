import { CheckCircle2, AlertTriangle } from "lucide-react";

const toList = (value) => (Array.isArray(value) ? value : []);

export default function ExplanationSection({ explanation }) {

    if (!explanation) {
        return <p className="placeholder-text">No AI explanation available.</p>;
    }

    const strengths = toList(explanation.strengths);
    const weaknesses = toList(explanation.weaknesses);
    const recommendation = explanation.recommendation || null;

    return (
        <div>
            <div className="eval-columns">
                <div>
                    <div className="skill-block-title">Strengths</div>
                    {strengths.length ? (
                        <ul className="eval-list">
                            {strengths.map((s, i) => (
                                <li key={i}>
                                    <CheckCircle2 className="eval-icon success" />
                                    <span>{s}</span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="chip-empty">None listed</p>
                    )}
                </div>

                <div>
                    <div className="skill-block-title">Weaknesses</div>
                    {weaknesses.length ? (
                        <ul className="eval-list">
                            {weaknesses.map((w, i) => (
                                <li key={i}>
                                    <AlertTriangle className="eval-icon warning" />
                                    <span>{w}</span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="chip-empty">None listed</p>
                    )}
                </div>
            </div>

            {recommendation && (
                <p className="eval-recommendation">{recommendation}</p>
            )}
        </div>
    );
}
