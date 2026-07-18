import { Users, TrendingUp, ThumbsUp, ThumbsDown } from "lucide-react";
import "../styles/dashboard.css";

export default function DashboardStats({ candidates }) {

    const total = candidates.length;

    const scored = candidates.filter((c) => typeof c.score === "number");
    const avgScore = scored.length
        ? Math.round(scored.reduce((sum, c) => sum + c.score, 0) / scored.length)
        : null;

    const recommended = candidates.filter((c) => c.tone === "success").length;
    const rejected = candidates.filter((c) => c.tone === "danger").length;

    const stats = [
        { label: "Total Candidates", value: total, icon: Users, tone: "primary" },
        { label: "Average Match Score", value: avgScore !== null ? `${avgScore}%` : "—", icon: TrendingUp, tone: "warning" },
        { label: "Recommended", value: recommended, icon: ThumbsUp, tone: "success" },
        { label: "Rejected", value: rejected, icon: ThumbsDown, tone: "danger" },
    ];

    return (
        <div className="dashboard-stats">
            {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                    <div className="stat-card" key={stat.label}>
                        <div className={`stat-icon tone-${stat.tone}`}>
                            <Icon />
                        </div>
                        <div>
                            <div className="stat-value">{stat.value}</div>
                            <div className="stat-label">{stat.label}</div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
