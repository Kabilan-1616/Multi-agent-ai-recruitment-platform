from pydantic import BaseModel,Field
from typing import List

class EmailDraft(BaseModel):
    subject: str
    body: str