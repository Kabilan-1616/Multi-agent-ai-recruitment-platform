from app.schemas.ranking_report import RankingReport


class RankingMapper:

    @staticmethod
    def to_response(report: RankingReport):

        candidates = []

        for candidate in report.ranked_candidates:

            candidates.append(
                {
                    "candidate": candidate.candidate.model_dump(),

                    "match_report": candidate.model_dump(),

                    "interview_questions":
                    candidate.interview_questions.model_dump()
                    if candidate.interview_questions
                    else None,

                    "explanation":
                    candidate.explanation.model_dump()
                    if candidate.explanation
                    else None,

                    "email":
                    candidate.email_draft.model_dump()
                    if candidate.email_draft
                    else None
                }
            )

        return {
            "total_candidates": report.total_candidates,
            "candidates": candidates
        }