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
    Validate SQL query using a real in-memory SQLite sandbox.
    Expected body: {"query": "SELECT ..."}
    """
    session = await GameSession.find_one(GameSession.session_id == session_id)
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")

    query = sql_query.get("query", "").strip()

    # Basic security
    lowered = query.lower()
    if not lowered.startswith("select"):
        # We might want to return a 200 with success:False to show the error in UI nicely
        return {"success": False, "message": "Security Alert: Only SELECT queries allowed."}
        
    if any(word in lowered for word in ["insert", "update", "delete", "drop", "alter", "exec", "pragma"]):
         return {"success": False, "message": "Security Alert: Harmful SQL detected."}

    try:
        # Run in sandbox
        result = run_sql_and_get_result(query)
    except Exception as e:
        return {"success": False, "message": f"Syntax Error: {str(e)}"}

    # Expected output: 2nd highest salary from:
    # Alice: 50000, Bob: 70000, Charlie: 90000, David: 70000, Eve: 90000
    # Highest: 90000 (Charlie, Eve)
    # 2nd Highest: 70000 (Bob, David) -> result should be one or distinct?
    # The user manual said "Find the 2nd highest salary". Result is [(70000,)]
    
    expected = [(70000,)]

    if result == expected:
        session.phase = GamePhase.SUDOKU # Proceed to Sudoku
        await session.save()

        return {
            "success": True,
            "message": "Access Granted: 2nd Highest Salary Identified. Logic Core Unlocked.",
            "result": result,
            "phase": session.phase
        }

    return {
        "success": False,
        "message": "Incorrect Result. Can you find the *second* highest?",
        "result": result
    }

import sqlite3

def run_sql_and_get_result(query: str):
    # Create in-memory DB
    conn = sqlite3.connect(":memory:")
    cursor = conn.cursor()

    # Create table
    cursor.execute("""
        CREATE TABLE employee (
            id INTEGER PRIMARY KEY,
            name TEXT,
            salary INTEGER
        );
    """)

    # Insert deterministic data
    cursor.executemany("""
        INSERT INTO employee (id, name, salary) VALUES (?, ?, ?)
    """, [
        (1, "Alice", 50000),
        (2, "Bob", 70000),
        (3, "Charlie", 90000),
        (4, "David", 70000),
        (5, "Eve", 90000),
    ])

    # Execute user query safely
    cursor.execute(query)
    result = cursor.fetchall()

    conn.close()
    return result

@router.post("/{session_id}/sudoku/complete")
async def complete_sudoku(session_id: UUID):
    session = await GameSession.find_one(GameSession.session_id == session_id)
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    
    # Verify phase
    if session.phase != GamePhase.SUDOKU:
         raise HTTPException(status_code=400, detail="Invalid Phase")

    # Reward: Logic Coins (let's say 500 needed for vault, give them enough)
    reward = 500 
    session.current_cp += reward
    session.phase = GamePhase.VAULT
    await session.save()
    return {"message": "Logic Core Stabilized", "reward": reward, "phase": session.phase}

@router.post("/{session_id}/vault/unlock")
async def unlock_vault(session_id: UUID):
    session = await GameSession.find_one(GameSession.session_id == session_id)
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")

    if session.phase != GamePhase.VAULT:
         raise HTTPException(status_code=400, detail="Invalid Phase")
         
    cost = 500
    if session.current_cp < cost:
        raise HTTPException(status_code=400, detail="Insufficient Logic Coins")
        
    session.current_cp -= cost
    session.phase = GamePhase.CELEBRATION
    await session.save()
    return {"message": "VAULT OPENED", "phase": session.phase}
