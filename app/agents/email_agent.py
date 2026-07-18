from app.agents.base_agent import BaseAgent
from app.schemas.email import EmailDraft
from app.graph.state import RecruitmentState
from app.prompts.email_prompt import email_prompt

class EmailAgent(BaseAgent):
    def __init__(self):
        super().__init__()

        self.structured_llm = self.llm.with_structured_output(
            EmailDraft
        )

    def _execute(self, state:RecruitmentState) -> RecruitmentState:
        prompt = email_prompt.invoke(
            {
                "candidate": state.candidate_profile.model_dump(),
                "job": state.job_profile.model_dump(),
                "recommendation": state.explanation.model_dump()
            }
        )
        
        email = self.structured_llm.invoke(prompt)

        state.email_draft = email

        return state