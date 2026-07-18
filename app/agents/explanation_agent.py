from app.agents.base_agent import BaseAgent
from app.graph.state import RecruitmentState
from app.schemas.explanation import Explanation
from app.prompts.explanation_prompt import explanation_prompt

class ExplanationAgent(BaseAgent):
    def __init__(self):
        super().__init__()
        self.structured_llm = self.llm.with_structured_output(
            Explanation
        )

    def _execute(self, state:RecruitmentState) -> RecruitmentState:
        prompt = explanation_prompt.invoke({
            "candidate": state.candidate_profile.model_dump(),
            "job": state.job_profile.model_dump(),
            "match": state.match_report.model_dump()
        })

        explanations = self.structured_llm.invoke(prompt)

        state.explanation = explanations

        return state
        
        