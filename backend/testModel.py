from typing import Optional, List
from uuid import UUID, uuid4
from pydantic import BaseModel

class User(BaseModel):
  id: Optional[UUID] = uuid4()
  title: str
  createdAt: str