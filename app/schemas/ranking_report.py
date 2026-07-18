from pydantic import BaseModel, Field
from typing import List

from app.schemas.match import MatchReport


class RankingReport(BaseModel):

    ranked_candidates: List[MatchReport] = Field(
        default_factory=list
    )

    total_candidates: int