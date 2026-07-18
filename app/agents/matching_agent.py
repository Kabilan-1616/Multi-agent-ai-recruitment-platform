from app.agents.base_agent import BaseAgent
from app.domain.matching.skill_service import SkillService
from app.domain.matching.recommendation_service import RecommendationService
from app.schemas.match import MatchReport


class MatchingAgent(BaseAgent):

    def __init__(self):
        super().__init__()
        self.skill_service = SkillService()
        self.recommendation_service = RecommendationService()

    def _execute(self, state):

        skill_match = self.skill_service.compare(
            state.candidate_profile.skills,
            state.job_profile.required_skills,
            state.job_profile.preferred_skills
        )

        recommendation = self.recommendation_service.recommend(
            skill_match
        )

        report = MatchReport(
            candidate=state.candidate_profile,
            overall_score=skill_match.score,
            skill_match=skill_match,
            recommendation=recommendation,
            explanation="Generated using deterministic skill matching."
        )

        state.match_report = report

        return state