from fastapi import FastAPI
from typing import List
from uuid import UUID, uuid4
from testModel import User

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Define the list of allowed origins (replace with your frontend's URL)
origins = [
    "http://localhost:3000",  # Allow requests from your frontend
]

# Configure CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

db: List[User] = [
    User(
        id = 1,
        title = "2023학년도 1학기 컴퓨터네트워킹 중간고사",
        createdAt = "2023-04-23"
    ),
    User(
        id = 2,
        title = "2023학년도 1학기 객체지향설계와패턴 중간고사",
        createdAt = "2023-04-24"
    )
]

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/api/lists")
async def fetch_lists():
    return db

@app.get("/api/${id}")
async def detail_examInfo():
    return db