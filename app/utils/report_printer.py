from app.schemas.ranking_report import RankingReport


class ReportPrinter:

    @staticmethod
    def print_ranking(report: RankingReport):

        print("\n" + "=" * 60)
        print("Candidate Ranking")
        print("=" * 60)

        print(
            f"{'Rank':<6}"
            f"{'Candidate':<25}"
            f"{'Score':<10}"
            f"{'Recommendation'}"
        )

        print("-" * 60)

        for index, candidate in enumerate(
            report.ranked_candidates,
            start=1
        ):

            print(
                f"{index:<6}"
                f"{candidate.candidate.name:<25}"
                f"{candidate.overall_score:<10}"
                f"{candidate.recommendation.value}"
            )

        print("-" * 60)
        print(
            f"Total Candidates : {report.total_candidates}"
        )
        print("=" * 60)