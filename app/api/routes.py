from fastapi import APIRouter, UploadFile, File

from app.utils.file_manager import FileManager
from app.workflows.recruitment_workflow import RecruitmentWorkflow
from app.api.mappers.analyze_mapper import AnalyzeMapper

router = APIRouter()


@router.post("/analyze")
async def analyze(
    job: UploadFile = File(...),
    resumes: list[UploadFile] = File(...)
):

    job_path = FileManager.save_job(job)
    resume_folder = FileManager.save_resumes(resumes)

    workflow = RecruitmentWorkflow()

    result = workflow.run(
        resume_folder=resume_folder,
        job_file=job_path
    )

    response = AnalyzeMapper.to_response(
        result["states"]
    )

    return response.model_dump()