
import os

from dotenv import load_dotenv

from langchain_groq import ChatGroq

load_dotenv()


def get_llm():
    """
    Creates and returns the LLM instance.

    This function hides all model configuration
    from the rest of the application.
    """

    return ChatGroq(
        api_key=os.getenv("GROQ_API_KEY"),
        model=os.getenv("MODEL_NAME"),
        temperature=0
    )