from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    MONGODB_URL: str
    SECRET_KEY: str
    ENVIRONMENT: str = "development"
    ALLOWED_ORIGINS: List[str] = ["http://localhost:5173"]
    DATABASE_NAME: str = "birthday_quest"

    class Config:
        env_file = ".env"

settings = Settings()
