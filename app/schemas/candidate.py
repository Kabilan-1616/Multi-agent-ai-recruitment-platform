from pydantic import BaseModel,Field
from typing import List

class Education(BaseModel):
    degree: str = Field(description="Degree obtained")
    institution: str = Field(description="College or university")
    year: str = Field(description="Graduation year")

class Experience(BaseModel):
    company: str
    role: str
    duration: str

class Project(BaseModel):
    title: str
    technologies: List[str]
    description: str

class CandidateProfile(BaseModel):
    name: str
    email: str
    phone: str

    skills: List[str]   
    education: List[Education]
    experience: List[Experience]
    projects: List[Project]
    certifications: List[str]