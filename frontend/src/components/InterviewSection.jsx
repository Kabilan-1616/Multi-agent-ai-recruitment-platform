const toList = (value) => (Array.isArray(value) ? value : []);

function QuestionBlock({ title, questions }) {
    if (!questions.length) return null;
    return (
        <div className="interview-block">
            <div className="interview-block-title">{title}</div>
            <div className="interview-list-cards">
                {questions.map((q, i) => (
                    <div className="question-card" key={i}>
                        <span className="question-number">{i + 1}</span>
                        <span className="question-text">
                            {typeof q === "string" ? q : q?.question || JSON.stringify(q)}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function InterviewSection({ questions }) {

    if (!questions) {
        return <p className="placeholder-text">No interview questions generated.</p>;
    }

    const technical = toList(questions.technical_questions || questions.technical);
    const behavioral = toList(questions.behavioral_questions || questions.behavioral);
    const coding = toList(questions.coding_questions || questions.coding);

    if (!technical.length && !behavioral.length && !coding.length) {
        return <p className="placeholder-text">No interview questions generated.</p>;
    }

    return (
        <div>
            <QuestionBlock title="Technical Questions" questions={technical} />
            <QuestionBlock title="Behavioral Questions" questions={behavioral} />
            <QuestionBlock title="Coding Questions" questions={coding} />
        </div>
    );
}
