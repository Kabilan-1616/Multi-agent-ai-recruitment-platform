from langchain_core.prompts import ChatPromptTemplate

explanation_prompt = ChatPromptTemplate.from_messages(
    [
    ("system",
     """
You are an expert AI Recruitment Assistant.

Analyze the candidate's match report.

Return:

- A short summary.
- Candidate strengths.
- Candidate weaknesses.
- Final recommendation.

Do not hallucinate.

Base everything only on the supplied data.
    """
    ),
    (
        "human",
        """
candidate
{candidate}
job
{job}
Match Report
{match}
        """
        )
    ]
)