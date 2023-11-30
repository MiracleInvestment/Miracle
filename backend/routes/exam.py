from fastapi import APIRouter, Depends, FastAPI, HTTPException, Request
from pydantic import BaseModel
from db.session import Base, SessionLocal
from db.connection import get_db
from sqlalchemy.orm import Session
from sqlalchemy import select
from dbModel.examModel import Exam, ExamQuestion
from typing import List
# from fastapi.middleware.cors import CORSMiddleware
# from .auth import get_current_user
# from main import app

ex_router = APIRouter(prefix="/exam") # Route 분리
  
class ExamCreate(BaseModel):
  ExamName: str
  ExamStartDate: str
  ExamEndDate: str
  
class ExamResponse(BaseModel):
  ExamID: int
  ExamName: str
  ExamStartDate: str
  ExamEndDate: str

class ExamQuestionCreate(BaseModel):
  ExamID: int
  QuestionText: str
  ModelAnswer: str
  Keywords: str
  
class ExamQuestionResponse(BaseModel):
  QuestionID: int
  ExamID: int
  QuestionText: str
  ModelAnswer: str
  Keywords: str

@ex_router.post("/create", response_model=ExamResponse)
def create_exam(exam: ExamCreate, db: Session=Depends(get_db)):
  
  db_exam = Exam(**exam.dict())
  
  db.add(db_exam)
  db.commit()
  db.refresh(db_exam)
  
  return db_exam

@ex_router.post("/createQuestion", response_model=ExamQuestionResponse)
def create_question(question: ExamQuestionCreate, db: Session=Depends(get_db)):
  db_question = ExamQuestion()
  
  db_question.ExamID = question.ExamID
  db_question.QuestionText = question.QuestionText
  db_question.ModelAnswer = question.ModelAnswer
  db_question.Keywords = question.Keywords
  
  db.add(db_question)
  db.commit()
  db.refresh(db_question)
  
  return db_question

# 이전 시험 불러오기
@ex_router.get("/lists")
async def getLists(db : Session=Depends(get_db)):
  lists = db.query(Exam).all()
  return lists

# CreateExam
@ex_router.get("/getLastPK")
async def getLastPK(db : Session=Depends(get_db)):
  stmt = select(Exam.ExamID).order_by(Exam.ExamID.desc()).limit(1)
  result = db.execute(stmt)
  lastPK = result.scalar()
  return lastPK

# PastExam
@ex_router.get("/{id}/getExam")
async def getExam(id : int, db : Session=Depends(get_db)):
  exam = db.query(Exam).filter(Exam.ExamID==id).first()
  
  return exam

# PastExam
@ex_router.get("/{id}/getQuestions")
async def getQuestions(id : int, db : Session=Depends(get_db)):
  exam = db.query(Exam).filter(Exam.ExamID==id).first()
  
  if exam is None:
    raise HTTPException(status_code=404, detail="Exam not found")
  
  questions = db.query(ExamQuestion).filter(ExamQuestion.ExamID==exam.ExamID).all()
  
  return questions