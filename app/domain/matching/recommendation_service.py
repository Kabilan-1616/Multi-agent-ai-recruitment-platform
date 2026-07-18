from app.schemas.recommendation import Recommendation
from app.schemas.skill_match import SkillMatch

class RecommendationService:
    def recommend(self,skill_match: SkillMatch) -> Recommendation:
        if skill_match.missing_required:
            return Recommendation.REVIEW
        
        if skill_match.score >= 85:
            return Recommendation.PROCEED
        
        if skill_match.score >= 60:
            return Recommendation.REVIEW
        
        return Recommendation.REJECT