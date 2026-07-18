import fitz  # PyMuPDF


def read_pdf(file_path: str) -> str:
    """
    Reads a PDF file and returns all extracted text.
    """

    document = fitz.open(file_path)

    text = ""

    for page in document:
        text += page.get_text()

    document.close()

    return text.strip()