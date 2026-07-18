import re

from app.schemas.candidate import CandidateProfile


class ResumeParser:

    SKILLS = [
        "python",
        "java",
        "sql",
        "javascript",
        "html",
        "css",
        "react",
        "fastapi",
        "langchain",
        "langgraph",
        "tensorflow",
        "keras",
        "numpy",
        "pandas",
        "docker",
        "aws",
        "azure",
        "rag",
        "faiss",
        "machine learning",
        "generative ai",
    ]

    def parse(self, resume_text: str) -> CandidateProfile:

        return CandidateProfile(
            name=self.extract_name(resume_text),
            email=self.extract_email(resume_text),
            phone=self.extract_phone(resume_text),
            skills=self.extract_skills(resume_text),
            education=[],
            experience=[],
            projects=[],
            certifications=[]
        )

    def extract_name(self, text: str):

        lines = [
            line.strip()
            for line in text.splitlines()
            if line.strip()
        ]

        if not lines:
            return ""

        name = lines[0]

        prefixes = [
            "name:",
            "candidate:",
            "candidate name:"
        ]

        lower = name.lower()

        for prefix in prefixes:
            if lower.startswith(prefix):
                name = name[len(prefix):].strip()

        return name

    def extract_email(self, text: str):

        match = re.search(
            r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}",
            text
        )

        return match.group() if match else ""

    def extract_phone(self, text: str):

        match = re.search(
            r"(\+?\d[\d\s\-]{8,15})",
            text
        )

        return match.group().strip() if match else ""

    def extract_skills(self, text: str):

        text = text.lower()

        return sorted([
            skill
            for skill in self.SKILLS
            if skill in text
        ])