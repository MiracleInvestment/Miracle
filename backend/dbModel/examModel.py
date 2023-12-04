from sqlalchemy import Column, Integer, DateTime, String, Text, ForeignKey
# from sqlalchemy.sql import text
from db.session import Base
# from sqlalchemy.orm import relationship

class Exam(Base):
  __tablename__ = "exam"
  
  ExamID = Column(Integer, primary_key=True, autoincrement=True)
  ExamName = Column(String, index=True)
  ExamStartDate = Column(DateTime)
  ExamEndDate = Column(DateTime)
  
  # questions = relationship("ExamQuestion", back_populates="exam")
  
class ExamQuestion(Base):
  __tablename__ = "exam_question"
  
  QuestionID = Column(Integer, primary_key=True, autoincrement=True)
  ExamID = Column(Integer)
  QuestionText = Column(String)
  ModelAnswer = Column(String)
  Keywords = Column(String)
  
  # exam = relationship("Exam", back_populates="questions")

class StudentInfo(Base):
  __tablename__ = "student_info"
  
  ID = Column(Integer, primary_key=True, autoincrement=True)
  StudentID = Column(String)
  ExamID = Column(Integer)
  QuestionID = Column(Integer)
  StudentAnswer = Column(String)
  # Score = Column(Integer)