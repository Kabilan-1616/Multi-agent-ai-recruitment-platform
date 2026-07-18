from pathlib import Path
import shutil
from fastapi import UploadFile


class FileManager:

    @staticmethod
    def save_job(job: UploadFile) -> str:

        upload_dir = Path("uploads/jobs")
        upload_dir.mkdir(parents=True, exist_ok=True)

        file_path = upload_dir / job.filename

        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(job.file, buffer)

        return str(file_path)


    @staticmethod
    def save_resumes(resumes: list[UploadFile]) -> str:

        upload_dir = Path("uploads/resumes")
        upload_dir.mkdir(parents=True, exist_ok=True)

        # Clear old resumes
        for file in upload_dir.glob("*"):
            if file.is_file():
                file.unlink()

        for resume in resumes:

            file_path = upload_dir / resume.filename

            with open(file_path, "wb") as buffer:
                shutil.copyfileobj(resume.file, buffer)

        return str(upload_dir)