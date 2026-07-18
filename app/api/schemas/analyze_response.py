from pydantic import BaseModel
from typing import List

from app.api.schemas.candidate_result import CandidateResult

class AnalyzeResponse(BaseModel):

    total_candidates: int

    candidates: List[CandidateResult]