from app.agents.base_agent import BaseAgent
from app.graph.state import RecruitmentState
from app.prompts.interview_prompt import interview_prompt
from app.schemas.interview import InterviewQuestions


class InterviewAgent(BaseAgent):

    def __init__(self):
        super().__init__()

        self.structured_llm = self.llm.with_structured_output(
            InterviewQuestions
        )

    def _execute(self, state: RecruitmentState):

        prompt = interview_prompt.invoke(
            {
                "candidate": state.candidate_profile.model_dump(),
                "job": state.job_profile.model_dump()
            }
        )

        questions = self.structured_llm.invoke(prompt)

        state.interview_questions = questions

        return state