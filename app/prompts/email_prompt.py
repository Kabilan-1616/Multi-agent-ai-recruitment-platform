from langchain_core.prompts import ChatPromptTemplate

email_prompt = ChatPromptTemplate.from_messages(
    [
        (
            "system",
            """ 
You are an HR recruiter.

Generate a professional email.

Rules:

- Keep it concise.
- Use a professional tone.
- Mention candidate name.
- Mention job role.
- Mention interview invitation.
- Do not hallucinate.
"""

        ),
        (
            "human",
            """ 
candidate
{candidate}
job
{job}
Recommendation
{recommendation}
"""
        )
    ]
)