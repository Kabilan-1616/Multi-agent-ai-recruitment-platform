from app.schemas.match import MatchReport
from app.schemas.ranking_report import RankingReport


class RankingService:

    def rank(
        self,
        reports: list[MatchReport]
    ) -> RankingReport:

        ranked = sorted(
            reports,
            key=lambda report: report.overall_score,
            reverse=True
        )

        return RankingReport(
            ranked_candidates=ranked,
            total_candidates=len(ranked)
        )