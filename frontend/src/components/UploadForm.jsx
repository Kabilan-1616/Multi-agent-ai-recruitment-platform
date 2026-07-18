import { useState } from "react";
import { UploadCloud, FileText, Sparkles } from "lucide-react";
import api from "../services/api";
import "../styles/upload.css";

export default function UploadForm({ loading, onAnalyzeStart, onAnalyzeComplete, onAnalyzeError }) {

    const [job, setJob] = useState(null);
    const [resumes, setResumes] = useState([]);

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!job) {
            alert("Upload a job description.");
            return;
        }

        if (resumes.length === 0) {
            alert("Upload at least one resume.");
            return;
        }

        const formData = new FormData();
        formData.append("job", job);
        resumes.forEach((resume) => {
            formData.append("resumes", resume);
        });

        try {
            onAnalyzeStart?.();

            const response = await api.post("/analyze", formData);

            onAnalyzeComplete?.(response.data);

        } catch (error) {
            console.error(error);
            alert("Analysis failed.");
            onAnalyzeError?.(error);
        }
    };

    return (
        <form className="upload-panel" onSubmit={handleSubmit}>

            <div className="upload-grid">

                <div>
                    <div className="upload-block-label">
                        <span className="step-index">1</span>
                        Job Description
                    </div>

                    <label className={`dropzone ${job ? "has-file" : ""}`}>
                        <input
                            type="file"
                            onChange={(e) => setJob(e.target.files[0] || null)}
                        />
                        <UploadCloud className="dropzone-icon" strokeWidth={1.5} />
                        <div className="dropzone-title">Drag and drop, or click to upload</div>
                        <div className="dropzone-hint">PDF, DOC, or DOCX</div>
                    </label>

                    {job && (
                        <div className="file-chip-list">
                            <div className="file-chip">
                                <FileText />
                                <span className="file-chip-name">{job.name}</span>
                            </div>
                        </div>
                    )}
                </div>

                <div>
                    <div className="upload-block-label">
                        <span className="step-index">2</span>
                        Candidate Resumes
                    </div>

                    <label className={`dropzone ${resumes.length ? "has-file" : ""}`}>
                        <input
                            type="file"
                            multiple
                            onChange={(e) => setResumes([...e.target.files])}
                        />
                        <UploadCloud className="dropzone-icon" strokeWidth={1.5} />
                        <div className="dropzone-title">Drag and drop, or click to upload</div>
                        <div className="dropzone-hint">Multiple PDFs supported</div>
                    </label>

                    {resumes.length > 0 && (
                        <div className="file-chip-list">
                            {resumes.map((resume, i) => (
                                <div className="file-chip" key={`${resume.name}-${i}`}>
                                    <FileText />
                                    <span className="file-chip-name">{resume.name}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

            </div>

            <div className="analyze-row">
                <button type="submit" className="analyze-button" disabled={loading}>
                    {loading ? <span className="spinner" /> : <Sparkles size={17} />}
                    {loading ? "Analyzing..." : "Analyze Candidates"}
                </button>
            </div>

        </form>
    );
}
