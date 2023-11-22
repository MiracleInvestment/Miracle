import datetime
from fastapi import APIRouter, Depends, FastAPI
from pydantic import BaseModel
# from sqlalchemy import BigInteger, VARCHAR, DateTime
from sqlalchemy.orm import Session
from db.connection import get_db
from dbModel.examModel import Exam
# from main import app
from typing import List
# from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


ex_router = APIRouter(prefix="/api") # Route 분리

class ResponseExam(BaseModel):
  id : int
  title : str
  createdAt : datetime.datetime
  
  class Config:
    orm_mode = True
    arbitrary_types_allowed = True # pydantic biginteger 같은 타입 처리

app = FastAPI()

# CORS 설정
# origins = [
#     "http://localhost:3000",
# ]

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=origins,
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

@ex_router.get('/Examlists', response_model=List[ResponseExam])
async def get_examLists(db: Session = Depends(get_db)):
  example = db.query(Exam).all()
  return example