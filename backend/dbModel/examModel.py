from sqlalchemy import Column, DateTime, Integer, VARCHAR
from sqlalchemy.sql import text
from db.session import Base

class Exam(Base):
  __tablename__ = "exam"
  
  id = Column(Integer, primary_key=True, index=True)
  title = Column(VARCHAR, nullable=False)
  createdAt = Column(DateTime, nullable=False, server_default=text("(CURRENT_TIMESTAMP)"))