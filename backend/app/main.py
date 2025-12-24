from fastapi import FastAPI
from contextlib import asynccontextmanager
from app.database import init_db
from app.routers import session, gameplay

@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_db()
    yield

app = FastAPI(title="Birthday Quest API", lifespan=lifespan)

app.include_router(session.router)
app.include_router(gameplay.router)

@app.get("/")
async def root():
    return {"message": "Birthday Quest Game Engine Online", "status": "active"}
