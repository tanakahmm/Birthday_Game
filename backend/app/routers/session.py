from fastapi import APIRouter, HTTPException, status
from app.models import GameSession, GamePhase
from uuid import UUID

router = APIRouter(prefix="/session", tags=["Session"])

@router.post("/start", response_model=GameSession)
async def start_session():
    """Create a new game session"""
    session = GameSession()
    await session.create()
    return session

@router.get("/{session_id}", response_model=GameSession)
async def get_session(session_id: UUID):
    """Get session state"""
    session = await GameSession.find_one(GameSession.session_id == session_id)
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    return session

@router.post("/{session_id}/reset", response_model=GameSession)
async def reset_session(session_id: UUID):
    """Reset session on failure (or manual)"""
    session = await GameSession.find_one(GameSession.session_id == session_id)
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    
    # Reset logic: clear inventory, reset points, keep ID? 
    # Spec says "Full Reset". Maybe create new session or reset fields.
    # To keep same browser session valid, we reset fields.
    session.current_cp = 0
    session.phase = GamePhase.WARMUP
    session.inventory = []
    session.failed_attempts += 1
    # is_active remains True
    
    await session.save()
    return session
