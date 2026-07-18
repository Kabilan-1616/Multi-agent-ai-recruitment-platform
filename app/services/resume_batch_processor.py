from pathlib import Path
from app.graph.state import RecruitmentState
from app.agents.resume_agent import ResumeAgent
from app.agents.job_agent import JobAgent
from app.agents.matching_agent import MatchingAgent
from app.agents.interview_agent import InterviewAgent
from app.agents.explanation_agent import ExplanationAgent
from app.agents.email_agent import EmailAgent

class ResumeBatchProcessor:
    def __init__(self):
        self.resume_agent = ResumeAgent()
        self.job_agent = JobAgent()
        self.matching_agent = MatchingAgent()
        self.interview_agent = InterviewAgent()
        self.explanation_agent = ExplanationAgent()
        self.email_agent = EmailAgent()

    def process_folder(self,resume_folder:str,job_file:str):

        reports = []

        resume_paths = sorted(Path(resume_folder).glob("*.pdf"))

        print(f"\nFound {len(resume_paths)} resumes.\n") 

        for resume in resume_paths:
            print("-" * 50)
            print(f"Processing {resume.name}")

            state = RecruitmentState(
                resume_path=str(resume),
                job_path=job_file
            )

            state = self.resume_agent.execute(state)
            print("✓ Resume Parsed")

            state = self.job_agent.execute(state)
            print("✓ Job Parsed")

            state = self.matching_agent.execute(state)
            print("✓ Candidate Matched")

            state = self.interview_agent.execute(state)
            print("✓ Interview Questions Generated")
            
            print()

            print("Technical Questions")
            for question in state.interview_questions.technical:
                print("-", question)

            print()

            print("Behavioral Questions")
            for question in state.interview_questions.behavioral:
                print("-", question)

            print()

            print("Coding Questions")
            for question in state.interview_questions.coding:
                print("-", question)

            print("-" * 50)

            state = self.explanation_agent.execute(state)
            print("✓ Explanation Generated")

            print()
            print("=" * 60)
            print("SUMMARY")
            print(state.explanation.summary)

            print()
            print("STRENGTHS")
            for item in state.explanation.strengths:
                print("-", item)

            print()
            print("WEAKNESSES")
            for item in state.explanation.weakneeses:
                print("-", item)

            print()
            print("RECOMMENDATION")
            print(state.explanation.recommendation)

            print("=" * 60)
            
            state = self.email_agent.execute(state)
            print("✓ Email Draft Generated")

            print()
            print("=" * 60)
            print("EMAIL SUBJECT")
            print(state.email_draft.subject)

            print()
            print("EMAIL BODY")
            print(state.email_draft.body)
            print("=" * 60)
            
            reports.append(state.match_report)

        return reports
