from sqlalchemy import Column, BigInteger, VARCHAR, DateTime
from sqlalchemy.sql import text
from db.session import Base

class User(Base):
  __tablename__ = "user"
  
  id = Column(BigInteger, primary_key=True, index=True)
  name = Column(VARCHAR, nullable=False)
  date = Column(DateTime, nullable=False, server_default=text("(CURRENT_TIMESTAMP)"))