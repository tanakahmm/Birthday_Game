from beanie import Document
from typing import List

class SqlChallenge(Document):
    challenge_id: str
    description: str
    question_text: str
    expected_query_result_hash: str # or store the raw result expectation if complex
    # Simplified validation: backend runs query, checks if result matches expected logic
    setup_scripts: List[str] # SQL commands to setup the temp DB
    solution_query: str # To verify against
    
    class Settings:
        name = "sql_challenges"
