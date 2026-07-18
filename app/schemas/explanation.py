from pydantic import BaseModel,Field
from typing import List

class Explanation(BaseModel):
    summary: str
    strengths: List[str]
    weaknesses: List[str]
    recommendation: str