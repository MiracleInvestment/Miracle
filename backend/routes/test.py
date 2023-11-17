from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from db.connection import get_db
from dbModel.testModel import User

router = APIRouter(prefix="/test") # Route 분리

@router.get('')
def test(db: Session = Depends(get_db)):
  example = db.query(User).all()
  return example