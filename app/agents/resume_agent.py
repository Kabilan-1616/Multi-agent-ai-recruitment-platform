from app.agents.base_agent import BaseAgent
from app.graph.state import RecruitmentState
from app.tools.file_loader import load_document
from app.parsers.resume_parser import ResumeParser


class ResumeAgent(BaseAgent):

    def __init__(self):
        super().__init__()
        self.parser = ResumeParser()

    def _execute(
        self,
        state: RecruitmentState
    ) -> RecruitmentState:

        resume_text = load_document(state.resume_path)

        state.resume_text = resume_text

        candidate = self.parser.parse(resume_text)

        state.candidate_profile = candidate

        return state