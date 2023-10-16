from typing import Optional, List
from uuid import UUID, uuid4
from pydantic import BaseModel

class User(BaseModel):
  id: int
  title: str
  createdAt: str