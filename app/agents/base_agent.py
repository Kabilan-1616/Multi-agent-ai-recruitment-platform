from abc import ABC, abstractmethod
import time

from app.config.llm import get_llm


class BaseAgent(ABC):
    """
    Base class for every AI agent.
    """

    def __init__(self):

        self.llm = get_llm()

    def execute(self, state):

        print(f"\nStarting {self.__class__.__name__}")

        start = time.time()

        try:

            state = self._execute(state)

            elapsed = time.time() - start

            print(
                f"{self.__class__.__name__} finished "
                f"in {elapsed:.2f} seconds."
            )

            return state

        except Exception as error:

            print(error)

            raise error

    @abstractmethod
    def _execute(self, state):
        pass