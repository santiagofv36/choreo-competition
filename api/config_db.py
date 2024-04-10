from sqlalchemy import URL, create_engine
from dotenv import load_dotenv
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os

load_dotenv()

connection_string = URL.create(
    "postgresql",
    username=os.getenv("DB_USER"),
    password=os.getenv("DB_PWD"),
    host=os.getenv("DB_HOST"),
    database=os.getenv("DB_NAME"),
)

engine = create_engine(
    connection_string,
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
