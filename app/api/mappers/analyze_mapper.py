from app.api.schemas.analyze_response import AnalyzeResponse
from app.api.schemas.candidate_result import CandidateResult


class AnalyzeMapper:

    @staticmethod
    def to_response(states):

        candidates = []

        for state in states:

            candidates.append(

                CandidateResult(

                    candidate=state["candidate_profile"],
                    match_report=state["match_report"],
                    interview_questions=state["interview_questions"],
                    explanation=state["explanation"],
                    email_draft=state["email_draft"]
                )

            )

        return AnalyzeResponse(

            total_candidates=len(candidates),

            candidates=candidates
        )