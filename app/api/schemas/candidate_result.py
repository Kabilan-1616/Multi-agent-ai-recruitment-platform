from pydantic import BaseModel

from app.schemas.candidate import CandidateProfile
from app.schemas.match import MatchReport
from app.schemas.interview import InterviewQuestions
from app.schemas.explanation import Explanation
from app.schemas.email import EmailDraft


class CandidateResult(BaseModel):

    candidate: CandidateProfile

    match_report: MatchReport

    interview_questions: InterviewQuestions

    explanation: Explanation

    email_draft: EmailDraft