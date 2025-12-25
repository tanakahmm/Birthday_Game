from app.models import Task, StoreItem, SqlChallenge, TaskType, GamePhase

async def seed_data():
    # Seed Tasks
    tasks_to_seed = [
        Task(task_id="click_1", description="Click the button", reward_cp=10, task_type=TaskType.CLICK, required_phase=GamePhase.WARMUP),
        Task(task_id="click_5", description="Click 5 times quickly", reward_cp=50, task_type=TaskType.CLICK, required_phase=GamePhase.WARMUP),
        Task(task_id="dumb_click", description="Click me if you think i am dumb", reward_cp=20, task_type=TaskType.CLICK, required_phase=GamePhase.WARMUP),
        Task(task_id="pattern_1", description="Complete the pattern", reward_cp=50, task_type=TaskType.PUZZLE, required_phase=GamePhase.WARMUP),
        Task(task_id="math_1", description="Solve the checksum", reward_cp=30, task_type=TaskType.PUZZLE, required_phase=GamePhase.WARMUP),
        Task(task_id="code_1", description="Fix the bug", reward_cp=40, task_type=TaskType.PUZZLE, required_phase=GamePhase.WARMUP),
    ]

    for task in tasks_to_seed:
        if not await Task.find_one(Task.task_id == task.task_id):
            await task.create()
    
    # Seed Store
    if await StoreItem.count() == 0:
        await StoreItem(
            item_id="sql_pass",
            name="SQL Access Pass",
            description="Unlock the terminal to attempt the final challenge.",
            cost=100,
            effect="unlock_phase_3"
        ).create()

    # Seed SQL Challenge
    if await SqlChallenge.count() == 0:
        await SqlChallenge(
            challenge_id="login_challenge",
            description="Find the user with the golden ticket.",
            question_text="Select the username from 'users' where has_ticket is true.",
            expected_query_result_hash="todo_hash", 
            setup_scripts=["CREATE TABLE users (username TEXT, has_ticket BOOLEAN);", "INSERT INTO users VALUES ('admin', false), ('birthday_boy', true);"],
            solution_query="SELECT username FROM users WHERE has_ticket = true"
        ).create()
