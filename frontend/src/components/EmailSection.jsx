import { useState } from "react";
import { Copy, Check } from "lucide-react";

export default function EmailSection({ emailDraft }) {

    const [copiedField, setCopiedField] = useState(null);

    if (!emailDraft) {
        return <p className="placeholder-text">No email draft generated.</p>;
    }

    const subject = emailDraft.subject || "(no subject)";
    const body = emailDraft.body || emailDraft.message || "";

    const copy = async (text, field) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopiedField(field);
            setTimeout(() => setCopiedField(null), 1800);
        } catch (err) {
            console.error("Copy failed", err);
        }
    };

    return (
        <div className="email-card">
            <div className="email-card-header">
                <span className="email-subject">{subject}</span>
                <div style={{ display: "flex", gap: "8px" }}>
                    <button
                        type="button"
                        className={`copy-button ${copiedField === "subject" ? "copied" : ""}`}
                        onClick={() => copy(subject, "subject")}
                    >
                        {copiedField === "subject" ? <Check size={13} /> : <Copy size={13} />}
                        Copy Subject
                    </button>
                    <button
                        type="button"
                        className={`copy-button ${copiedField === "email" ? "copied" : ""}`}
                        onClick={() => copy(`Subject: ${subject}\n\n${body}`, "email")}
                    >
                        {copiedField === "email" ? <Check size={13} /> : <Copy size={13} />}
                        Copy Email
                    </button>
                </div>
            </div>
            <div className="email-body">{body || "No message body."}</div>
        </div>
    );
}
