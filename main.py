from app.workflows.recruitment_workflow import RecruitmentWorkflow
from app.utils.report_printer import ReportPrinter
def main():

    workflow = RecruitmentWorkflow()

    result = workflow.run(

        resume_folder="data/resume",

        job_file="data/jobs/ai_engineer.txt"

    )

    ReportPrinter.print_ranking(result["rankings"])


if __name__ == "__main__":
    main()