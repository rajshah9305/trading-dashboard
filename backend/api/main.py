from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from pydantic import BaseModel
from datetime import datetime
from typing import List
import sys
import os

# Add the parent directory to the path to import db modules
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from db.database import get_db, create_tables
from db.models import Trade, Portfolio

app = FastAPI(title="Trading Dashboard API")

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create tables on startup
create_tables()

# Pydantic models for API
class TradeCreate(BaseModel):
    symbol: str
    side: str
    price: float
    quantity: float

class TradeResponse(BaseModel):
    id: int
    timestamp: datetime
    symbol: str
    side: str
    price: float
    quantity: float
    profit_loss: float

class PortfolioResponse(BaseModel):
    total_value: float
    cash_balance: float
    profit_loss: float

# API Routes
@app.get("/")
async def root():
    return {"message": "Trading Dashboard API is running!"}

@app.post("/trades/", response_model=TradeResponse)
async def create_trade(trade: TradeCreate, db: Session = Depends(get_db)):
    db_trade = Trade(
        symbol=trade.symbol,
        side=trade.side,
        price=trade.price,
        quantity=trade.quantity,
        profit_loss=0.0  # Calculate this based on your logic
    )
    db.add(db_trade)
    db.commit()
    db.refresh(db_trade)
    return db_trade

@app.get("/trades/", response_model=List[TradeResponse])
async def get_trades(db: Session = Depends(get_db)):
    trades = db.query(Trade).order_by(Trade.timestamp.desc()).limit(100).all()
    return trades

@app.get("/portfolio/", response_model=PortfolioResponse)
async def get_portfolio(db: Session = Depends(get_db)):
    # Mock portfolio data - implement your calculation logic
    portfolio = Portfolio(
        total_value=10000.0,
        cash_balance=5000.0,
        profit_loss=500.0
    )
    return portfolio

@app.get("/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.utcnow()}