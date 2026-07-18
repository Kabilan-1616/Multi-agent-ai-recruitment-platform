'''
from typing import TypedDict

class RecruitmentState(TypedDict):
    resume_path: str
    job_path: str

    resume_text: str
    job_text: str

    candidate_profile: dict
    job_profile: dict

    score: float
    explanation: str

    interview_questions: list[str]

    email_draft: str
'''

from typing import Optional

from pydantic import BaseModel, Field

from app.schemas.candidate import CandidateProfile
from app.schemas.job import JobProfile
from app.schemas.match import MatchReport
from app.schemas.interview import InterviewQuestions
from app.schemas.explanation import Explanation
from app.schemas.email import EmailDraft

class RecruitmentState(BaseModel):
    """
    Shared state used by every AI agent.

    Every agent reads information from this object
    and writes new information back into it.
    """
    
    # INPUT FILES
    resume_path: str = Field(description="Path of the uploaded resume.")
    job_path: str = Field(default="",description="Path of the uploaded Job Description.")

    # RAW TEXT
    resume_text: str = ""
    job_text: str = ""

    # AI OUTPUTS
    candidate_profile: Optional[CandidateProfile] = None
    job_profile: Optional[JobProfile] = None
    
    # MATCHING
    match_report: MatchReport | None = None
    explanation: Explanation | None = None


    # INTERVIEW
    interview_questions: InterviewQuestions | None = None
    
    # EMAIL
    email_draft: EmailDraft | None = None