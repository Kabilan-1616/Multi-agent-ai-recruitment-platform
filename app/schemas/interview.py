from pydantic import BaseModel
from typing import List

class InterviewQuestions(BaseModel):
    technical: List[str]
    behavioral: List[str]
    coding: List[str]