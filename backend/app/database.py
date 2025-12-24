from motor.motor_asyncio import AsyncIOMotorClient
from beanie import init_beanie
from app.config import settings

from app.models import GameSession, Task, StoreItem, SqlChallenge
from app.seed import seed_data

async def init_db():
    client = AsyncIOMotorClient(settings.MONGODB_URL)
    database = client[settings.DATABASE_NAME]
    
    # Initialize Beanie with the document models
    await init_beanie(database=database, document_models=[
        GameSession,
        Task,
        StoreItem,
        SqlChallenge
    ])
    
    await seed_data()
