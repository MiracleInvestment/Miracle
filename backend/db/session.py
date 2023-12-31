# import pymysql
from sqlalchemy import *
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

DB_URL = 'mysql+pymysql://tkdalsss:tkdalsss!@34.64.146.223:3306/sys'
engine = create_engine(DB_URL)
Base.metadata.create_all(bind=engine)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
