from enum import Enum

class Recommendation(str, Enum):
    PROCEED = "Proceed to Technical Interview"
    REVIEW = "Need Recruiter Review"
    REJECT = "NOt Recommended"
