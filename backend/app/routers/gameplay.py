from fastapi import APIRouter, HTTPException, Depends
from app.models import GameSession, Task, StoreItem, GamePhase
from uuid import UUID

router = APIRouter(prefix="/game", tags=["Gameplay"])

@router.post("/{session_id}/complete-task/{task_id}")
async def complete_task(session_id: UUID, task_id: str):
    session = await GameSession.find_one(GameSession.session_id == session_id)
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
        
    task = await Task.find_one(Task.task_id == task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
        
    # Logic: Verify phase, cooldowns, etc (Simplified for now)
    session.current_cp += task.reward_cp
    await session.save()
    return {"message": "Task completed", "new_cp": session.current_cp}

@router.post("/{session_id}/buy/{item_id}")
async def buy_item(session_id: UUID, item_id: str):
    session = await GameSession.find_one(GameSession.session_id == session_id)
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
        
    item = await StoreItem.find_one(StoreItem.item_id == item_id)
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
        
    if session.current_cp < item.cost:
        raise HTTPException(status_code=400, detail="Not enough CP")
        
    if item.item_id in session.inventory:
         return {"message": "Item already owned"}
         
    session.current_cp -= item.cost
    session.inventory.append(item.item_id)
    
    # Unlock Phase Logic
    if item.effect == "unlock_phase_3":
        session.phase = GamePhase.SQL_GATE
    
    await session.save()
    return {"message": f"Purchased {item.name}", "phase": session.phase, "remaining_cp": session.current_cp}

@router.post("/{session_id}/sql/validate")
async def validate_sql(session_id: UUID, sql_query: dict):
    """
    Validate SQL query.
    Expected body: {"query": "SELECT ..."}
    """
    session = await GameSession.find_one(GameSession.session_id == session_id)
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
        
    # Mock validation logic for now
    # In a real CTF, we'd run this against a read-only DB
    query = sql_query.get("query", "").lower().strip()
    
    # Simple check for "correct" answer (this can be anything for the demo)
    # Let's say the answer is to find the "birthday_cake" table or similar
    
    if "select" in query and "birthday_cake" in query:
        session.phase = GamePhase.BIRTHDAY
        await session.save()
        return {"success": True, "message": "Access Granted: Birthday Protocol Initiated", "phase": session.phase}
    else:
        # Penalize? or just fail
        return {"success": False, "message": "Access Denied: Invalid Syntax or Target"}
