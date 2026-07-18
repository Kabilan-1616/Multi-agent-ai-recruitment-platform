from app.agents.base_agent import BaseAgent
from app.graph.state import RecruitmentState
from app.prompts.job_prompt import job_prompt
from app.schemas.job import JobProfile
from app.tools.file_loader import load_document

class JobAgent(BaseAgent):
    def __init__(self):
        super().__init__()

        self.structured_llm = self.llm.with_structured_output(JobProfile)

    def _execute(self, state: RecruitmentState) -> RecruitmentState:
        job_text = load_document(state.job_path)
        state.job_text = job_text

        prompt = job_prompt.invoke({"job_text":job_text})
        
        job_profile = self.structured_llm.invoke(prompt)
        state.job_profile = job_profile

        return state