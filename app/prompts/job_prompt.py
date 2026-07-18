from langchain_core.prompts import ChatPromptTemplate

job_prompt = ChatPromptTemplate.from_messages(
    [
        ("system",
        """
You are an expert AI Job Description Analyzer.

Your task is to extract structured information from a job description.

Rules:

- Extract only information present in the document.
- Do not hallucinate.
- If information is unavailable, return empty values.
- Return structured information only.
        """),
        ("human",
         """
Job Description:

{job_text}
        """)
    ]
)