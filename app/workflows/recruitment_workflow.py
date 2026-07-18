from pathlib import Path

from app.graph.recruitment_graph import graph
from app.graph.state import RecruitmentState
from app.services.ranking_service import RankingService


class RecruitmentWorkflow:

    def __init__(self):
        self.ranking_service = RankingService()

    def run(
        self,
        resume_folder: str,
        job_file: str
    ):

        states = []
        reports = []

        for resume in Path(resume_folder).glob("*.pdf"):

            print(f"\nProcessing {resume.name}")

            state = RecruitmentState(
                resume_path=str(resume),
                job_path=job_file
            )

            result = graph.invoke(state)

            states.append(result)
            reports.append(result["match_report"])

        ranking = self.ranking_service.rank(reports)

        return {
            "ranking": ranking,
            "states": states
        }