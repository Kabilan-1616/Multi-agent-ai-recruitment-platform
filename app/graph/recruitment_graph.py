from langgraph.graph import StateGraph, START, END

from app.graph.state import RecruitmentState

from app.agents.resume_agent import ResumeAgent
from app.agents.job_agent import JobAgent
from app.agents.matching_agent import MatchingAgent
from app.agents.interview_agent import InterviewAgent
from app.agents.explanation_agent import ExplanationAgent
from app.agents.email_agent import EmailAgent

resume_agent = ResumeAgent()
job_agent = JobAgent()
matching_agent =  MatchingAgent()
interview_agent =  InterviewAgent()
explanation_agent =  ExplanationAgent()
email_agent = EmailAgent()

builder = StateGraph(RecruitmentState)

builder.add_node("resume",resume_agent.execute)
builder.add_node("job",job_agent.execute)
builder.add_node("matching",matching_agent.execute)
builder.add_node("interview",interview_agent.execute)
builder.add_node("explanation",explanation_agent.execute)
builder.add_node("email",email_agent.execute)


builder.add_edge(START,"resume")
builder.add_edge("resume","job")
builder.add_edge("job","matching")
builder.add_edge("matching","interview")
builder.add_edge("interview","explanation")
builder.add_edge("explanation","email")
builder.add_edge("email",END)

graph = builder.compile()