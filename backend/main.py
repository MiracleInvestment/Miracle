from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from routes.test import router as test_router
from routes.exam import ex_router

app = FastAPI()

# Define the list of allowed origins (replace with your frontend's URL)
origins = [
    "http://localhost:3000",  # Allow requests from your frontend
    "http://localhost:8000"
]

# Configure CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

app.include_router(test_router)
app.include_router(ex_router)
   
@app.get("/")
def read_root():
    return {"Hello": "World"}

# engine = engineconn()
# session = engine.sessionmaker()

 
# DB_URL = 'mysql+pymysql://tkdalsss:tkdalsss!@34.64.146.223:3306/user'
# app.add_middleware(DBSessionMiddleware, db_url=DB_URL)

# db: List[User] = [
#     User(
#         id = 1,
#         title = "2023학년도 1학기 컴퓨터네트워킹 중간고사",
#         createdAt = "2023-04-23"
#     ),
#     User(
#         id = 2,
#         title = "2023학년도 1학기 객체지향설계와패턴 중간고사",
#         createdAt = "2023-04-24"
#     )
# ]