from pydantic import BaseModel, Field
from typing import List

class JobProfile(BaseModel):
    role: str = Field(description="JOb title")
    required_skills: List[str] = Field(description="Mandatory skills")
    preferred_skills: List[str] = Field(description="Optional preffered skills")
    responsibilities: List[str] = Field(description="Main responsibilities")
    experience_required: str = Field(description="Required experience")
    education_required: str = Field(description="Required education")
