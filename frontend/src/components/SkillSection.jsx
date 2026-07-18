import { toList } from "../utils/candidate";

function ChipRow({ items, tone }) {
    if (!items.length) {
        return <p className="chip-empty">None listed</p>;
    }

    return (
        <div className="chip-row">
            {items.map((item, index) => (
                <span
                    key={`${item}-${index}`}
                    className={`chip chip-${tone}`}
                >
                    {item}
                </span>
            ))}
        </div>
    );
}

export default function SkillSection({ skillMatch }) {

    if (!skillMatch) {
        return (
            <p className="placeholder-text">
                No skill match data available.
            </p>
        );
    }

    const required = toList(
        skillMatch.matched_required
    );

    const missingRequired = toList(
        skillMatch.missing_required
    );

    const preferred = toList(
        skillMatch.matched_preferred
    );

    const missingPreferred = toList(
        skillMatch.missing_preferred
    );

    const additional = toList(
        skillMatch.extra_skills
    );

    const percentage = skillMatch.score;

    return (
        <div>

            {percentage !== null && percentage !== undefined && (
                <p className="eval-summary">
                    <strong>{Math.round(percentage)}%</strong> Overall Skill Match
                </p>
            )}

            <div className="skill-block">
                <div className="skill-block-title">
                    Required Skills
                </div>

                <ChipRow
                    items={required}
                    tone="green"
                />
            </div>

            <div className="skill-block">
                <div className="skill-block-title">
                    Missing Required
                </div>

                <ChipRow
                    items={missingRequired}
                    tone="red"
                />
            </div>

            <div className="skill-block">
                <div className="skill-block-title">
                    Preferred Skills
                </div>

                <ChipRow
                    items={preferred}
                    tone="green"
                />
            </div>

            <div className="skill-block">
                <div className="skill-block-title">
                    Missing Preferred
                </div>

                <ChipRow
                    items={missingPreferred}
                    tone="orange"
                />
            </div>

            <div className="skill-block">
                <div className="skill-block-title">
                    Additional Skills
                </div>

                <ChipRow
                    items={additional}
                    tone="blue"
                />
            </div>

        </div>
    );
}