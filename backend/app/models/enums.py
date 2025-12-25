from enum import Enum

class GamePhase(str, Enum):
    WARMUP = "WARMUP"
    CHALLENGE = "CHALLENGE"
    SQL_GATE = "SQL_GATE"
    SUDOKU = "SUDOKU"
    VAULT = "VAULT"
    CELEBRATION = "CELEBRATION"

class TaskType(str, Enum):
    CLICK = "CLICK"
    INPUT = "INPUT"
    WAIT = "WAIT"
    PUZZLE = "PUZZLE"
