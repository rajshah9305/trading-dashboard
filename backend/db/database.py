from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from .models import Base # Changed from 'from models import Base' to relative import
import os

# Database URL - Update with your credentials
DATABASE_URL = "postgresql://trader:your_password@localhost:5432/trading_dashboard"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def create_tables():
    Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()