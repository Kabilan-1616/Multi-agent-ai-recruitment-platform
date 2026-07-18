from pydantic import BaseModel, Field
from typing import List

class SkillMatch(BaseModel):
    """
    Result of comparing candidate skills
    against job skills.
    """
    score: float = Field(description="Skills match percentage")
    matched_required: List[str] = Field(default_factory=list,description="Required skills possessed by candidate")
    missing_required: List[str] = Field(default_factory=list,description="Required skills missing")
    matched_preferred: List[str] = Field(default_factory=list,description="Preferred skills possessed")
    missing_preferred: List[str] = Field(default_factory=list,description="Preferred skills missing")
    extra_skills: List[str] = Field(default_factory=list,description="Addition candidate skills")

