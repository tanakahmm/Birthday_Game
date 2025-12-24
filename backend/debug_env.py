from dotenv import dotenv_values
import os
from app.config import settings

print("--- DEBUG INFO ---")
print(f"Current Working Directory: {os.getcwd()}")
print(f"Environment Variable 'MONGODB_URL': {os.environ.get('MONGODB_URL', 'Not Set')}")
print(f"Pydantic Settings MONGODB_URL: {settings.MONGODB_URL}")

env_vals = dotenv_values(".env")
print(f"Direct read from .env file: {env_vals.get('MONGODB_URL', 'Not Found in .env')}")
