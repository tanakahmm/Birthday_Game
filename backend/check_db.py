import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from app.config import settings
import sys

async def check_connection():
    uri = settings.MONGODB_URL
    print(f"Testing connection to: {uri.split('@')[1] if '@' in uri else 'LOCAL/INVALID'}")
    try:
        client = AsyncIOMotorClient(uri, serverSelectionTimeoutMS=5000)
        # Force a connection
        await client.admin.command('ping')
        print("SUCCESS: Connected to MongoDB!")
        return True
    except Exception as e:
        print(f"FAILURE: Could not connect to MongoDB.\nError: {e}")
        return False

if __name__ == "__main__":
    try:
        if asyncio.run(check_connection()):
            sys.exit(0)
        else:
            sys.exit(1)
    except Exception as e:
        print(f"Script Error: {e}")
        sys.exit(1)
