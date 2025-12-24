from beanie import Document, Indexed
from pydantic import Field
from typing import List, Optional
from uuid import UUID, uuid4
from datetime import datetime
from .enums import GamePhase

class GameSession(Document):
    session_id: UUID = Field(default_factory=uuid4, unique=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    current_cp: int = 0
    phase: GamePhase = GamePhase.WARMUP
    inventory: List[str] = [] # List of item IDs owned
    failed_attempts: int = 0
    is_active: bool = True

    class Settings:
        name = "game_sessions"
