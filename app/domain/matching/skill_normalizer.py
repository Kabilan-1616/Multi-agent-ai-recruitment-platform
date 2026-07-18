from typing import List


class SkillNormalizer:

    """
    Converts skills into a canonical format
    before comparison.
    """

    # Simple alias dictionary.
    # We'll grow this later.
    ALIASES = {

        "js": "javascript",

        "py": "python",

        "azure open ai": "azure openai",

        "ms sql": "microsoft sql server"
    }

    @classmethod
    def normalize(
        cls,
        skills: List[str]
    ) -> List[str]:

        normalized = []

        for skill in skills:

            skill = skill.strip().lower()

            if not skill:
                continue

            skill = cls.ALIASES.get(
                skill,
                skill
            )

            normalized.append(skill)

        return sorted(
            list(set(normalized))
        )