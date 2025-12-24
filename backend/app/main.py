from fastapi import FastAPI
from contextlib import asynccontextmanager
from app.database import init_db
from fastapi.middleware.cors import CORSMiddleware
from app.routers import session, gameplay

@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_db()
    yield

app = FastAPI(title="Birthday Quest API", lifespan=lifespan)

# CORS Configuration
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "*" # Allow all for local dev convenience
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(session.router)
app.include_router(gameplay.router)

@app.get("/")
async def root():
    return {"message": "Birthday Quest Game Engine Online", "status": "active"}
