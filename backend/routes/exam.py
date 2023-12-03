from fastapi import APIRouter, Depends, FastAPI, Form, HTTPException, Request, status
from pydantic import BaseModel
from db.session import Base, SessionLocal
from db.connection import get_db
from sqlalchemy.orm import Session
from sqlalchemy import select
from dbModel.examModel import Exam, ExamQuestion, StudentInfo
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

class StudentInfo(BaseModel):
  StudentID: str
  ExamName: str
  QuestionID: int
  StudentAnswer: str
  
# class AnswerList(BaseModel):
#   answers: List[Answer]

class StudentInfoResponse(BaseModel):
  ID: int
  StudentID: str
  ExamName: str
  QuestionID: int
  StudentAnswer: str

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

# CreateExam 수정
@ex_router.post("/{examId}/{questionId}/edit")
async def editQuestion(examId:int, questionId:int, updated_data:dict, db : Session=Depends(get_db)):
  question = db.query(ExamQuestion).filter(ExamQuestion.ExamID==examId, ExamQuestion.QuestionID==questionId).first()
  
  if question is None:
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Question is not found")
  
  for key, value in updated_data:
    setattr(question, key, value)
  
  db.commit()
  
  return {"message": "Question updated successfully", "updated_data": updated_data}
  

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

# DoExam
@ex_router.post("/{examId}/submitStudentAnswer")
async def submitAnswer(answers: List[StudentInfo], db:Session=Depends(get_db)):
  try:
    for answer in answers:
      student_answer = StudentInfo(**answer.dict())
      db.add(student_answer)
      # db.refresh(student_answer)
      # student_answers.append(student_answer)
    db.commit()
    return {"message": "Student answers submitted successfully"}
  except Exception as e:
    db.rollback()
    raise HTTPException(status_code=500, detail=str(e))
  finally:
    db.close()
  
  # return student_answers