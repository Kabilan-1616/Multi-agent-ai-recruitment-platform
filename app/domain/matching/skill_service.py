"""
from schemas.skill_match import SkillMatch

class SkillService:
    def compare(self,candidate_skills: list[str],
                required_skills: list[str],
                preferred_skills:list[str]
                ) -> SkillMatch:
        
        candidate = {
            skill.strip().lower()
            for skill in candidate_skills
        }

        required = {
            skill.strip().lower()
            for skill in required_skills
        }

        preferred = {
            skill.strip().lower()
            for skill in preferred_skills
        }

        matched_required = sorted(candidate & required)
        missing_required = sorted(required - candidate)
        matched_preferred = sorted(candidate & preferred)
        missing_preferred = sorted(required - candidate)

        extra_skills = sorted(candidate - required - preferred)

        required_weight = 0.8
        preffered_weight = 0.2

        required_score = (
            len(matched_required)/len(required)
            if required else 1.0
            )
        
        preferred_score = (
            len(preferred_skills)/len(preferred)
            if required else 1.0
        )

        overall_score = (
            (required_score * required_weight) + (preferred_score * preffered_weight)
        )* 100

        return SkillMatch(
            score=round(overall_score,2),
            match_required= matched_required,
            missing_required=missing_required,
            matched_preferred=matched_preferred,
            missing_preferred=missing_preferred,
            extra_skills=extra_skills
        )

"""

from app.schemas.skill_match import SkillMatch
from app.domain.matching.skill_normalizer import SkillNormalizer


class SkillService:
    """
    Compares candidate skills against
    required and preferred job skills.
    """

    REQUIRED_WEIGHT = 0.8
    PREFERRED_WEIGHT = 0.2

    def compare(
        self,
        candidate_skills: list[str],
        required_skills: list[str],
        preferred_skills: list[str]
    ) -> SkillMatch:

        candidate = set(
            SkillNormalizer.normalize(candidate_skills)
        )

        required = set(
            SkillNormalizer.normalize(required_skills)
        )

        preferred = set(
            SkillNormalizer.normalize(preferred_skills)
        )

        matched_required = sorted(candidate & required)
        missing_required = sorted(required - candidate)

        matched_preferred = sorted(candidate & preferred)
        missing_preferred = sorted(required - candidate)

        extra_skills = sorted(
            candidate - required - preferred
        )

        required_score = (
            len(matched_required) / len(required)
            if required else 1.0
        )

        preferred_score = (
            len(matched_preferred) / len(preferred)
            if preferred else 1.0
        )

        overall_score = (
            (
                required_score * self.REQUIRED_WEIGHT
            ) +
            (
                preferred_score * self.PREFERRED_WEIGHT
            )
        ) * 100

        return SkillMatch(
            score=round(overall_score, 2),
            matched_required=matched_required,
            missing_required=missing_required,
            matched_preferred=matched_preferred,
            missing_preferred=missing_preferred,
            extra_skills=extra_skills
        )