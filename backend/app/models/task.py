from beanie import Document
from pydantic import Field
from .enums import TaskType

class Task(Document):
    task_id: str  # Human readable ID e.g. "click_10_times"
    description: str
    reward_cp: int
    task_type: TaskType
    required_phase: str  # Use string to avoid circular imports if needed, or Enum
    
    class Settings:
        name = "tasks"
