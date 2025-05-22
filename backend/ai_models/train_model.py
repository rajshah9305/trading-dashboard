import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
import joblib
import yfinance as yf

def create_features(df):
    """Create features for ML model"""
    # Technical indicators
    df['rsi'] = calculate_rsi(df['Close'], 14)
    df['sma_20'] = df['Close'].rolling(window=20).mean()
    df['sma_50'] = df['Close'].rolling(window=50).mean()
    
    # Price changes
    df['price_change'] = df['Close'].pct_change()
    df['volume_change'] = df['Volume'].pct_change()
    
    # Target variable (1 if price goes up in next period, 0 otherwise)
    df['target'] = (df['Close'].shift(-1) > df['Close']).astype(int)
    
    return df.dropna()

def calculate_rsi(prices, window=14):
    """Calculate RSI indicator"""
    delta = prices.diff()
    gain = (delta.where(delta > 0, 0)).rolling(window=window).mean()
    loss = (-delta.where(delta < 0, 0)).rolling(window=window).mean()
    rs = gain / loss
    return 100 - (100 / (1 + rs))

def train_model():
    """Train ML model for trading signals"""
    # Download sample data
    ticker = "BTC-USD"
    data = yf.download(ticker, period="1y", interval="1h")
    
    # Create features
    data_with_features = create_features(data)
    
    # Prepare features and target
    feature_columns = ['rsi', 'sma_20', 'sma_50', 'price_change', 'volume_change']
    X = data_with_features[feature_columns]
    y = data_with_features['target']
    
    # Split data
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    # Train model
    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)
    
    # Evaluate
    y_pred = model.predict(X_test)
    accuracy = accuracy_score(y_test, y_pred)
    print(f"Model accuracy: {accuracy:.4f}")
    
    # Save model
    joblib.dump(model, 'backend/ai_models/trading_model.pkl') # Corrected path
    print("Model saved successfully!")

if __name__ == "__main__":
    train_model()