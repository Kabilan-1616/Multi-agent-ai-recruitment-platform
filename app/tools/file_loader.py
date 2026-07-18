from pathlib import Path
from app.tools.pdf_reader import read_pdf

def load_document(file_path: str) -> str:

    extention = Path(file_path).suffix.lower()

    if extention == ".pdf":
        return read_pdf(file_path)
    
    elif extention == ".txt":
        with open(file_path,"r",encoding="utf-8") as file:
            return file.read()
        
    else:
        raise ValueError(f"unsupported file type: {extention}")