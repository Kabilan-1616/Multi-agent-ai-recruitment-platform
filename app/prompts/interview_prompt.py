from langchain_core.prompts import ChatPromptTemplate

interview_prompt = ChatPromptTemplate.from_messages(
    [
        (
            "system",
            """
You are an expert technical interviewer.

Generate interview questions based on the candidate profile and job profile.

Rules:

- Return exactly:
    - 5 technical questions
    - 3 behavioral questions
    - 2 coding questions
- Questions should match the candidate's experience.
- Do not explain.
"""
        ),
        (
            "human",
            """
Candidate

{candidate}

Job

{job}
"""
        )
    ]
)